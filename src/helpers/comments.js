const {comment, image} = require('../models')

module.exports = {
    async newest(){
        const comments = await comment.find()
        .limit(5)
        .sort({timestamp: -1})
        //si se peude recorreslos comentarios haha
        for(const commentt of comments){
            const imagee = await image.findOne({_id: commentt.image_id})
            commentt.image = imagee
        }

        return comments
    }
}