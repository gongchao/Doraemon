import events from 'events'

class Router extends events {
    static defaultOptions = {
        key: '/'
    }

    constructor(routers, context) {
        super()

        this.routes = {}

        this.options = Router.defaultOptions

        this.register(routers)

        window.onhashchange = this.change.bind(this, context)

        this.change.call(this, context)
    }

    register(routers) {
        for (const [key, fn] of Object.entries(routers)) {
            this.routes[key] = fn
        }
    }

    change(context) {
        this.hash = location.hash.substring(1)

        this.arg = this.hash.substring(this.options.key.length).split('/')
        
        const match = this.options.key + this.arg[0]

        if (!this.routes[match]) {
            return this.routes[Object.keys(this.routes)[0]].call(context, ...this.arg.slice(1))
        }

        this.routes[match].call(context, ...this.arg.slice(1))

        this.emit('change')
    }
}

export default Router
