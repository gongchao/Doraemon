import Fetcher from './utils/fetcher'
import render from './utils/render'
import Router from './utils/router'

class Doraemon {
    static render = render

    constructor({ routers = {} }) {
        this.fetch = new Fetcher()

        this.state = {}

        this.render = Doraemon.render

        this.router = new Router(routers, this)
    }

    async init(cb = () => {}) {

        this.router.emit('change')

        this.state.user = await this.fetch.getInfo()

        cb.call(this)
    }
}

window.Doraemon = Doraemon