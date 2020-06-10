const mongoose = require('mongoose')

mongoose
    .connect('mongodb://next6:wjx3622wln7080@karyeunwinsvr19.southeastasia.cloudapp.azure.com:27017/trrappdb?SSL=false', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })
    

const db = mongoose.connection

module.exports = db