import path from 'path'

export default (configs) => {
    const injection = {};

    injection.resolvePath = (p) => configs.url + p

    const link = (p) => `<link rel="stylesheet" href="${injection.resolvePath(p)}">`
    const script = (p) => `<script src="${injection.resolvePath(p)}"></script>`

    injection.header = () => [
        ...configs.userConfigs.stylesheets.map(link)
    ].join('')

    injection.footer = () => [
        `<script>window.configs=${JSON.stringify(configs)}</script>`,
        script('/assets/js/polyfill.min.js'),
        script('/assets/js/moment-with-locales.min.js'),
        script('/assets/js/doraemon.js'),
        script('/assets/js/app.js'),
    ].join('')

    injection.themeUrl = () => ``

    return injection
}