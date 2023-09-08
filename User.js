
// New Mongoose Lib from Web Dev Limplified

const mongoose = require('mongoose');


mongoose.connect("mongodb://localhost:27017/testDB");

const addressSchema = mongoose.Schema({
    street: String,
    city: String,
});

const userSchene = new mongoose.Schema({
    name: String,

    age: {
        type: Number,
        min: 1,
        max: 100,
        validate: {
            validator: v => v % 2 == 0,
            message: props => `${props.value } is not an even number`, 
        }
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
    },

    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable:true
    },

    updatedAt: {
        type: Date,
        default: () => Date.now(),
    },
    bestFriend:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    },
    hobbies: [String],
    address: addressSchema
});

userSchene.methods.Hole = function() {
    console.log(`Hi. My name is ${this.name}`);
}

module.exports = mongoose.model("User", userSchene);