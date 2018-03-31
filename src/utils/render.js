
export default (template, data) => {
    return template.render({
        ...data,
        util: {
            format(date) {
                return moment(date).format(`${window.configs.date_format} ${window.configs.time_format}`)
            },
        },
    })
}