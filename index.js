// const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/nomi").then(()=>{
//     console.log("Connected to MongoDB Successfully");
// }).catch((err)=>
// {
//     console.log(err);
// })

// const student = new mongoose.Schema({
//     "name" : String,
//     "workOut":Boolean,
//     "height":Number
// })

// const Student = new mongoose.model("Student",student);


// // const adder = async ()=>{

// // const ss = new Student({
// //     name:"Noman Ali",
// //     workOut:true,
// //     height:7
// // })

// // await ss.save();
// // }

// // adder();


// // Write Methods =>

// // const adder = async ()=>{
// //   const ss = await Student.create(
// //       {
// //         name:"Noman Ali Khokhar",
// //         workOut:false,
// //         height:5
// //       })
// //       console.log(ss);
// // }
// // adder();


// // Find() Methods

// const adder = async ()=>{
// const ss = await Student.find({height:{$in:[5,6,7]}}); // this will find height which equal to 6 only
// console.log(ss);
// }

// adder();

// // https://www.mongodb.com/docs/manual/reference/operator/query/




// From Web Dev Simplified


const { use } = require('express/lib/application');
const mongoose = require('mongoose');
const User = require("./User");



mongoose.connect("mongodb://localhost:27017/testDB");


/**
  
   Both are same functions
 
    // const user = new User({ name: "Noman Ali", age: 12 });
    // await user.save();


    const user = await User.create({name:"Nomi Ali", age : 12});
    console.log(user);
 
 
   */


async function run() {
  // const user = new User({ name: "Noman Ali", age: 12 });
  // await user.save();

  // immutable meaning unchangable
  // mutable meaning changeable

  try {
    // const user = await User.create({
    //   name: "Nomi Ali",
    //   age: 12,
    //   email: "ali@gmail.com",
    //   hobbies: ["WeightLifting", "Bowling"],
    //   address: {
    //     street: "Multan",
    //     city: "Punjab"
    //   }
    // });


    // user.createAt = 5;

    // await user.save();

    // console.log(user);


    // const user = await User.findById("6317ab6a2c9d2a9321ebe6dd");
    // const user = await User.find({name:"Nomi Ali"}); // find query method is K Sencitive 
    // const user = await User.where("age").gte("12").where("name").equals("Nomi Ali");
    // const user = await User.where("age").gte("10").lt("30").where("name").equals("Nomi Ali").limit(1);
    
    // const user = await User.where("age").gte("10").lt("30").where("name").equals("Nomi Ali").populate('bestFriend');
    
    const user = await User.find({name:"Nomi"});
    
    console.log(user);

    user.Hole();

  } 
      catch (error) 
  {
    console.log(error.message);
  }
}

run();