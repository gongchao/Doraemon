import PostsComponent from './components/_posts.nj'
import PostComponent from './components/_post.nj'

// 首页
const Home = async function(type, cursor) {
    const issues = await this.fetch.getIssues(type, cursor)
   
    const render = this.render(PostsComponent, issues)

    document.getElementById('page').innerHTML = render
}

// 内容页
const Post = async function(issueId) {

    const issue = await this.fetch.getIssue(issueId)

    const render = this.render(PostComponent, issue)

    document.getElementById('page').innerHTML = render
}

// 路由
const routers = {
    '/home': Home,
    '/post': Post
}

// 初始化
const doraemon = window.doraemon = new Doraemon({
    routers,
})

doraemon.fetch.on('start', () => {
    document.getElementById('page').innerHTML = `<div class="loading">拼命加载中...</div>`
})

doraemon.init(async function() {
    document.title = this.state.user.name
})