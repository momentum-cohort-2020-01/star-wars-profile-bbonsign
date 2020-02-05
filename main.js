// 'character' as a function parameter assumes an object returned from SWAPI

const body = document.querySelector('body')
let charName = parseBodyId(body)

// build character card on pages that aren't index.html
if (charName !== 'index') {
    fetch('https://swapi.co/api/people/?search=leia%20organa')
        .then((resp) => { return resp.json() } )
        .then(function (data) {
            const character = data.results[0]
            // buildCard(character)
            })

}

function buildCard(character) {
// Name
// Species
// Home world
// Birth Year
// height
// starships

}

// ================ Helper Functions ================
function parseBodyId(body) {
    let bodyIdSplit = body.id.split('-')
    return bodyIdSplit.join(' ')
}