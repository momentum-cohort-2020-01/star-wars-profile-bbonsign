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
        })
}



function buildCard() {
    // const name = characterProps.name
    // const species = characterProps.species
    // const homeworld = characterProps.homeworld
    // const birthyear = characterProps.birthyear
    // const height = characterProps.height
    // const starships = characterProps.starships // array

    // console.log(characterProps)
}

// ================ Helper Functions ================
function parseBodyId(bodyId) {
    let bodyIdSplit = bodyId.split('_')
    return bodyIdSplit.join('%20')
}

function fetchURL(charName) {
    return `https://swapi.co/api/people/?search=${charName}`
}

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

function createCard(customer) {
    const card = createElement('div', ['card', 'flex'])

    const img = createElement('img', ['face'])
    img.src = customer.picture.large
    img.alt = `Profile picture of ${customerName(customer)}`

    let components = [
        createTextElem('p', ['name'], customerName(customer)),
        createTextElem('p', ['email'], customer.email),
        createTextElem('p', ['location'], customerLocation(customer)),
        createTextElem('p', ['dob'], customerDOB(customer)),
        createTextElem('p', ['reg'], customerSince(customer))
    ]

    card.appendChild(img)

    for (let component of components) {
        card.appendChild(component)
    }
    return card
}

