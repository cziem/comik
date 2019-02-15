require('../config/config')
import crypto  from 'crypto'
import axios from 'axios'


const key = process.env.API_KEY
const privKey = process.env.PRIV_KEY
let ts = Date.now()
const hash = crypto.createHash('md5').update(ts + privKey + key).digest('hex')
const uri = `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${key}&hash=${hash}&limit=10`

let results

axios
  .get(uri)
  .then(blob => {
    // console.log(blob.data.data.results)
    let resData = blob.data.data.results

    results = resData

    renderDOM(results)
  })
  .catch(err => console.log(err))

function genDOM(data) {
  // GET HTML ELMENTS
  // console.log(data)
  const contentEl = document.querySelector('.ui.links.cards')

  const card = document.createElement('div')
  const content = document.createElement('div')
  const header = document.createElement('div')
  const meta = document.createElement('div')
  const friends = document.createElement('a')
  const desc = document.createElement('div')

  card.setAttribute('class', 'card')
  content.setAttribute('class', 'content')
  header.setAttribute('class', 'header')
  meta.setAttribute('class', 'meta')
  desc.setAttribute('class', 'description')

  header.textContent = data.title
  meta.textContent = data.format

  if (data.description) {
    desc.textContent = data.description.substring(0, 100) + '...'
  } else if (data.variantDescription) {
    desc.textContent = data.variantDescription
  } else if (data.characters.items[0].name) {
    desc.textContent = data.characters.items[0].name
  }

  content.appendChild(header)
  meta.appendChild(friends)
  content.appendChild(meta)
  content.appendChild(desc)
  card.appendChild(content)

  // console.log(card)
  contentEl.appendChild(card)
  return contentEl
}

function renderDOM (arr) {
  arr.forEach(item => genDOM(item))
}