const mongoose = require('mongoose')

const connectToDataBase = async() => {
    const url = 'mongodb+srv://Omar:phone123@cluster0.mbj6ynz.mongodb.net/Phonebook?retryWrites=true&w=majority'

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
