require('../config/config')
import { crypto } from 'crypto'
import axios from 'axios'


const key = process.env.API_KEY
const privKey = process.env.PRIV_KEY
let ts = Date.now()
const hash = crypto.createHash('md5').update(ts + privKey + key).digest('hex')
const uri = `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${key}&hash=${hash}`

axios
  .get(uri)
  .then(blob => 
    console.log(blob.data.data)
  )
  .catch(err => console.log(err))
