const comment  =require('../models/comment')
const image = require('../models/image')

async function imageCounter(){
    return await image.countDocuments()
}

async function commentCounter(){
    return await comment.countDocuments()
}

async function imageTotalViewsCounter(){
    const result = await image.aggregate([{$group: {
        _id: '1',
        viewsTotal: {$sum: '$views'}
    }}])
    return result[0].viewsTotal
}
async function likesTotalCounter(){
    const result = await image.aggregate([{$group: {
        _id: '1',
        likesTotal: {$sum: '$likes'}
    }}])
    return result[0].likesTotal
}

module.exports = async ()=>{
    const results = await Promise.all([
        imageCounter(), 
        commentCounter(), 
        imageTotalViewsCounter(), 
        likesTotalCounter()
    ])

    return {
        images: results[0],
        comments: results[1],
        views: results[2],
        likes: results[3]
    }
}