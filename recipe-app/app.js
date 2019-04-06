const
    recipes = require ('recipesearch')
    inquirer = require('inquirer')




async function searchRecipe(query) {

    const recipeResponse = await recipes.search(query)

    const recipeArray = getRecipeArray(recipeResponse.hits)

    getRecipe(recipeArray)

}





async function getRecipe(recipeArray) {
    
    const selectedRecipe = await recipePrompt(recipeArray)
    
    const selectionRecipeResponse = await recipes.get(selectedRecipe)

    prettyPrintRecipe(selectionRecipeResponse)

}




function getRecipeArray(results) {

    const recipeArray = []

    results.forEach(result => {

        const recipe = {name: result.recipe.label, value: result.recipe.uri }
        recipeArray.push(recipe);

    })

    return recipeArray
}




function prettyPrintRecipe(recipe) {

    console.log()

    const {label, url, dietLabels, ingredientLines, calories} = recipe
    const constCalories = Math.round(calories)

    console.log(`-------- ${label} --------`)
    console.log(` + Dietary Labels: ${dietLabels}`)
    console.log(` + Ingredients: `)

    ingredientLines.forEach( function(line) {
        console.log(`    - ${line}`)
    })

    console.log(` + Calories: ${constCalories}`)

    console.log(`Url: ${url}`);

}




async function recipePrompt(recipeArray) {
    return inquirer.prompt([{
        type: 'list',
        name: 'recipe',
        choices: recipeArray,
        message: 'Select a recipe'
    }])
}




module.exports = { searchRecipe }