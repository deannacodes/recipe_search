const
    superagent = require('superagent'),
    config = require('./config')


exports.search = (query) => {

    const url = `${config.base}?app_id=${config.id}&app_key=${config.key}&q=${query}`

    return superagent.get(url)
                     .then(response => response.body)
                     .catch(error => error.response.body)

}

exports.get = (uri) => {
    const prepUri = uri.recipe.replace(':', '%3A').replace('#', '%23').split('/').join('%2F')
    const url = `${config.base}?app_id=${config.id}&app_key=${config.key}&r=${prepUri}`

    return superagent.get(url)
                     .then(response => response.body[0])
                     .catch(error => error.response.body)

}