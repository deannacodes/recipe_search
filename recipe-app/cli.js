const
    yargs = require('yargs'),
    app = require('./app')

const flags = yargs
    .usage('$0: Usage <cmd> [options]')
    .command({
        command: 'search',
        desc: 'Suggests recipes based on the ingredient queried',
        builder: (yargs) => {
            return yargs.options('i', {
                alias: 'ingredient',
                describe: 'insert an ingredient to search for recipe suggestions',
                demand: true
            })
        },
        handler: (argv) => {
            app.searchRecipe(argv.ingredient)
        }
    })
    .help('help')
    .argv



