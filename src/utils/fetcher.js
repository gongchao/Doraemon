import axios from 'axios'
import events from 'events'

class Fetcher extends events {
    constructor() {
        super()

        this.instance = axios.create({
            baseURL: 'https://api.github.com/graphql'
        })

        this.instance.defaults.headers.common['Authorization'] = `bearer ${window.configs.token.replace(/#/g, '')}`

        this.instance.interceptors.request.use((config) => {
            this.emit('start')

            return config
        })

        this.instance.interceptors.response.use((config) => {
            this.emit('complete')

            return config
        })

        const [owner, name] = window.configs.repository.split('/')

        this.owner = owner
        this.name = name
    }

    async getInfo() {
        const result = await this.instance.post('', {
            query: `{
                user(login: "${window.configs.repository.split('/')[0]}") {
                  name
                  avatarUrl
                  email
                  websiteUrl
                  url
                  bio
                  login
                }
              }`
        })

        return result.data.data.user;
    }

    async getIssues(type = 'after', cursor) {
        let issuesQuery = `${type === 'before' ? 'last' : 'first'} : ${window.configs.per_page}, states: OPEN, orderBy: {field: UPDATED_AT, direction: DESC}`

        if (cursor) {
            issuesQuery += `, ${type}: "${cursor}"`
        }
  
        const result = await this.instance.post('', {
            query: `{
                repository(owner: "${this.owner}", name: "${this.name}") {
                  issues(${issuesQuery}) {
                    pageInfo {
                      hasPreviousPage
                      startCursor
                      hasNextPage
                      endCursor
                    }
                    totalCount
                    edges {
                      node {
                        number
                        title
                        author {
                          avatarUrl
                          login
                          url
                        }
                        updatedAt
                        labels(first: 3) {
                          edges {
                            node {
                              color
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }`
        })

        return result.data.data.repository.issues;
    }

    async getIssue(issueId) {
        const result = await this.instance.post('', {
            query: `{
                repository(owner: "${this.owner}", name: "${this.name}") {
                  issue(number: ${issueId}) {
                    title
                    author {
                      avatarUrl
                      login
                      url
                    }
                    bodyHTML
                    updatedAt
                    labels(first: 3) {
                      edges {
                        node {
                          color
                          name
                        }
                      }
                    }
                    number
                    comments {
                      totalCount
                    }
                  }
                }
              }`
        })
    
        return result.data.data.repository.issue
    }
}

export default Fetcher