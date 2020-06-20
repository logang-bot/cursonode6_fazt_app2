const express = require('express')

const config  = require('./src/server/config')
const { database } = require('./keys')

const app = config(express())

//database
require('./database')

//starting server
app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'))
})

