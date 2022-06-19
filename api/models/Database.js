const mongoose = require('mongoose')

const connectToDataBase = async() => {
    const url = process.env.DATABASE;

    console.log('connecting to', url)

    await mongoose.connect(url)

        .then(result => {
            console.log('connected to MongoDB')
        })
        .catch((error) => {
            console.log('error connecting to MongoDB:', error.message)
        })
}
module.exports = connectToDataBase;





