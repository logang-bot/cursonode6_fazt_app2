const helpers = {}

helpers.randomNumber = () =>{
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
    let randomnumber = ""
    for(let i=0; i < 6; i++){
        randomnumber += possible.charAt(Math.floor(Math.random() * possible.length)) 
    }
    return randomnumber
}

module.exports = helpers