const moongoose = require('mongoose')

const {database} = require('./keys')


moongoose.connect(database.URI, {
    useNewUrlParser:true
})

.then(db => console.log('db is connected'))
.catch(err => console.error(err))