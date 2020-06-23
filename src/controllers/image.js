const path = require('path')
const {randomNumber} = require('../helpers/libs')
const fs = require('fs-extra')

const {image} = require('../models')
const { ETXTBSY } = require('constants')

const ctrl = {}

ctrl.index =(req,res)=>{

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
            //res.redirect('/images')
            res.send('works')
        }
        else {
            await fs.unlink(imageTempPath)
            res.status(500).json({ error: 'only images are allowed' })
        }
    }  
}
saveimage()
    
}
ctrl.like = (req,res)=>{

}

ctrl.comment = (req,res)=>{

}

ctrl.remove = (req,res)=>{
    
}
module.exports = ctrl