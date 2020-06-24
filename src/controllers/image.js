const path = require('path')
const {randomNumber} = require('../helpers/libs')
const fs = require('fs-extra')
const md5 = require('md5')

const {image, comment} = require('../models')
const sidebar = require('../helpers/sidebar')

const { ETXTBSY } = require('constants')

const ctrl = {}

ctrl.index =async (req,res)=>{
    let viewModel = {imagee:{},comments:{}}
    const imagee = await image.findOne({filename: {$regex: req.params.image_id}})
    if (imagee) {
        imagee.views += 1
        viewModel.imagee = imagee
        await imagee.save()
        const comments = await comment.find({ image_id: imagee._id })
        viewModel.comments = comments
        viewModel = await sidebar(viewModel)
        res.render('image', viewModel)
    }
    else{
        res.redirect('/')
    }
    
}
ctrl.create =async (req,res)=>{

const saveimage = async ()=>{
    const imgurl = randomNumber()
    const images = await image.find({filename: imgurl})
    if(images.length > 0){
        saveimage()
    }
    else{
        console.log(imgurl)
        const ext = path.extname(req.file.originalname).toLowerCase()
        const imageTempPath = req.file.path
        const targetPath = path.resolve(`src/public/upload/${imgurl}${ext}`)

        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
            await fs.rename(imageTempPath, targetPath)
            const newimg = new image({
                title: req.body.title,
                filename: imgurl + ext,
                description: req.body.description
            })
            const imgsaved = await newimg.save()
            res.redirect('/images/'+ imgurl)
        }
        else {
            await fs.unlink(imageTempPath)
            res.status(500).json({ error: 'only images are allowed' })
        }
    }  
}
saveimage()
    
}
ctrl.like = async (req,res)=>{
    const imagee = await image.findOne({filename:{$regex: req.params.image_id}})
    if(imagee){
        imagee.likes +=1
        await imagee.save()
        res.json({likes: imagee.likes})
    }
    else{
        res.status(500).json({error: 'Internal error'})
    }
}

ctrl.comment = async (req,res)=>{
    const imagee = await image.findOne({filename:{$regex: req.params.image_id}})
    if(imagee){
        const newComment = new comment(req.body)
        newComment.gravatar = md5(newComment.email)
        newComment.image_id = imagee._id
        await newComment.save()
        res.redirect('/images/'+imagee.uniqueId)
    }
    else{
        res.redirect('/')
    }
}

ctrl.remove = async (req,res)=>{
    const imagee = await image.findOne({filename:{$regex: req.params.image_id}})
    if(imagee){
        await fs.unlink(path.resolve('./src/public/upload/'+ imagee.filename))
        await comment.deleteOne({image_id: imagee._id})
        await imagee.remove()
        res.json(true)
    }
}
module.exports = ctrl