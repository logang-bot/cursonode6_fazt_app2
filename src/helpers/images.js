const image = require('../models/image')

module.exports = {
    async popular(){
        const images  = await image.find()
        .limit(9)
        .sort({likes: -1})
        return images
    }
}