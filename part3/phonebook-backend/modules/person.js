require("dotenv").config()
const mongoose = require("mongoose")

mongoose.set("strictQuery",false)

const url = process.env.MONGODB_URL

console.log("connecting to",url)
mongoose.connect(url, {family : 4})
.then(result => {
    console.log("Connecting to the MongoDB")
})
.catch(error => {
    console.log("error connecting to the MongoDB",error.message)
})
const personSchema = new mongoose.Schema({
    name: {
        type : String,
        minLength: 3,
        required: true,},
    number: {
        type: String,
        required: true,
        minLength: 8,
        validate:{
            validator: function(v){
                const phoneRegex = /^\d{2,3}-\d{7,10}$/
                return phoneRegex.test(v)
            },
            message: props => `${props.value} is not a valid phone number!`
        }
        },
        
})

personSchema.set("toJSON", {
    transform: (document,returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person",personSchema)