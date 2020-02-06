// 'character' as a function parameter assumes an object returned from SWAPI
// Name - got
// Species
// Home world
// Birth Year - got
// height - got
// starships

const body = document.querySelector('body')
const bodyId = body.id
let charName = parseBodyId(bodyId)

// build character card on pages that aren't index.html
if (charName !== 'index') {
    var name, birthyear, height, homeworld, species, homeworld, starships
    var characterProps = { name, birthyear, height, homeworld, species, homeworld, starships }

    fetch(fetchURL(charName))
        .then((resp) => { return resp.json() })
        .then(function (data) {
            return data.results[0]
        })
        .then(function (data) {
            let character = data
            characterProps.name = character.name
            characterProps.height = character.height
            characterProps.birthyear = character.birth_year
            characterProps.homeworld = character.homeworld // url
            characterProps.species = character.species // url array
            characterProps.starships = character.starships // url array
            return characterProps.homeworld
        })
        .then(function (url) {
            return fetch(url)
        })
        .then(function (result) {
            return result.json()
        })
        .then(function (json) {
            let temp = json
            characterProps.homeworld = temp.name
            // console.log(characterProps)

            return characterProps.species
        })
        .then(function (urls) {
            let promises = []
            for (url of urls) {
                promises.push(fetch(url))
            }
            return Promise.all(promises)
        })
        .then(function (results) {
            let jsonArr = []
            for (result of results) {
                jsonArr.push(result.json())
            }
            // console.log(jsonArr)
            return Promise.all(jsonArr)
        })
        .then(function (jsonArr) {
            let temp = jsonArr
            let nameArr = []
            if (temp.length != 0) {
                for (let ob of temp) {
                    nameArr.push(ob.name)
                }
            }
            characterProps.species = nameArr
            return characterProps.starships
        })
        .then(function (urls) {
            let promises = []
            for (url of urls) {
                promises.push(fetch(url))
            }
            return Promise.all(promises)
        })
        .then(function (results) {
            let jsonArr = []
            for (result of results) {
                jsonArr.push(result.json())
            }
            console.log(jsonArr)
            return Promise.all(jsonArr)
        })
        .then(function (jsonArr) {
            let temp = jsonArr
            let nameArr = []
            if (temp.length != 0) {
                for (let ob of temp) {
                    nameArr.push(ob.name)
                }
            }
            characterProps.starships = nameArr
            return characterProps
        })
        .then(function (prev) {
            console.log(prev)
            buildCard()
        })
}



function buildCard() {
    const name = characterProps.name
    const species = characterProps.species // array
    const homeworld = characterProps.homeworld
    const birthyear = characterProps.birthyear
    const height = characterProps.height
    const starships = characterProps.starships // array

    const article = createElement('article', ['mw5', 'center', 'bg-white', 'br3', 'pa3', 'pa4-ns', 'mv3', 'ba', 'b--black-10'])
    const divTC = createElement('div', ['tc'])
    const img = createElement('img', ['br-100', 'h4', 'w4', 'dib', 'ba', 'b--black-05', 'pa2'])
    img.src = `./images/${bodyId}.jpg`
    const nameElem = createTextElem('h1', ['f4'], name)
    const hr1 = createElement('hr', ['mw3', 'bb', 'bw1', 'b--black-10'])

    body.appendChild(article)
    article.appendChild(divTC)
    divTC.appendChild(img)
    divTC.appendChild(nameElem)
    divTC.appendChild(hr1)

    elements = [createTextElem('h2', ['f5'], 'Species')] // continue pushing items below

    for (let item of species) {
        elements.push(createTextElem('p', ['lh-copy', 'measure', 'center', 'f6', 'black-70'], item))
    }

    elements.push(
        createElement('hr', ['mw3', 'bb', 'bw1', 'b--black-10']),
        createTextElem('h2', ['f5'], 'Homeworld'),
        createTextElem('p', ['lh-copy', 'measure', 'center', 'f6', 'black-70'], homeworld),
        createElement('hr', ['mw3', 'bb', 'bw1', 'b--black-10']),
        createTextElem('h2', ['f5'], 'birthyear'),
        createTextElem('p', ['lh-copy', 'measure', 'center', 'f6', 'black-70'], birthyear),
        createElement('hr', ['mw3', 'bb', 'bw1', 'b--black-10']),
        createTextElem('h2', ['f5'], 'Height'),
        createTextElem('p', ['lh-copy', 'measure', 'center', 'f6', 'black-70'], height+'cm'),
        createElement('hr', ['mw3', 'bb', 'bw1', 'b--black-10']),
        createTextElem('h2', ['f5'], 'Starships')
    )

    for (let item of starships) {
        if (starships.length === 0){
            item = "None"
        }
        elements.push(createTextElem('p', ['lh-copy', 'measure', 'center', 'f6', 'black-70'], item))
    }

    for (element of elements) {
        article.append(element)
    }
}


// ================ Helper Functions ================
function parseBodyId(bodyId) {
    let bodyIdSplit = bodyId.split('_')
    return bodyIdSplit.join('%20')
}

// type should be a type of html element, as a string
// classArr should be an array of strings to be used as HTML classes
function createElement(type, classList) {
    let element = document.createElement(type)
    element.classList.add(...classList)
    return element
}

// innerHTML should mostly be text, mostly just needed HTML to
// add a <br> in the address later on
function createTextElem(type, classList, innerHTML) {
    let elem = createElement(type, classList)
    elem.innerHTML = innerHTML
    return elem
}

// not used, but could be relevant for refactoring
function fetchURL(charName) {
    return `https://swapi.co/api/people/?search=${charName}`
}

// not used, but could be relevant for refactoring
function fetchNameProp(url, property) {
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            let temp = data
            characterProps[property] = temp.name
        })
}

// not used, but could be relevant for refactoring
function fetchName(url) {
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            let temp = data
            return temp.name
        })
}

// not used, but could be relevant for refactoring
function fetchNameArray(urls, property) {
    let promises = []
    for (let url of urls) {
        promises.push(fetchName(url))
        // .then(function (response) {
        //     return response.json()
        // })
        // .then(function (data) {
        //     let temp = data
        //     return temp.name
        // })
    }
    return Promise.all(promises).then((results) => { characterProps[property] = results })
}