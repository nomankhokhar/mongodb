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



// Insert a new document into the "users" collection
db.users.insertOne({
  name: "John Doe",
  age: 30,
  email: "john@example.com"
});




// Find all documents in the "users" collection
db.users.find();

// Find documents with a specific field value
db.users.find({ name: "John Doe" });





// Update a document with a specific filter
db.users.updateOne(
  { name: "John Doe" },
  { $set: { age: 31 } }
);



// Delete a document with a specific filter
db.users.deleteOne({ name: "John Doe" });



// Count all documents in the "users" collection
db.users.count();


// Find documents with specific fields only
db.users.find({}, { name: 1, age: 1 });

// Exclude specific fields from the result
db.users.find({}, { email: 0 });

// Find documents with age greater than 30 OR email ends with ".com"
db.users.find({
  $or: [
      { age: { $gt: 30 } },
      { email: /\.com$/ }
  ]
});


// Sort documents by age in ascending order
db.users.find().sort({ age: 1 });

// Sort documents by age in descending order
db.users.find().sort({ age: -1 });


// Limit the number of documents returned
db.users.find().limit(5);

// Skip the first 3 documents and return the rest
db.users.find().skip(3);




// Create an index on the "name" field
db.users.createIndex({ name: 1 });

// List all indexes on the "users" collection
db.users.getIndexes();



// Calculate the average age of users
db.users.aggregate([
  { $group: { _id: null, avgAge: { $avg: "$age" } } }
]);


// Perform a text search for documents containing "MongoDB"
db.articles.find({ $text: { $search: "MongoDB" } });


// Find documents near a specific location
db.places.find({
  location: {
      $near: {
          $geometry: {
              type: "Point",
              coordinates: [longitude, latitude]
          },
          $maxDistance: 1000 // in meters
      }
  }
});



// Calculate the total age of users using map-reduce
db.users.mapReduce(
  function () {
      emit("totalAge", this.age);
  },
  function (key, values) {
      return Array.sum(values);
  },
  {
      out: { inline: 1 }
  }
);



// Start a transaction
session = db.getMongo().startSession();

session.startTransaction();

try {
    // Perform multiple operations within the transaction
    db.collection1.insertOne({});
    db.collection2.updateOne({}, { $set: { field: value } });

    // Commit the transaction
    session.commitTransaction();
} catch (error) {
    // Handle errors and abort the transaction if necessary
    session.abortTransaction();
} finally {
    // End the session
    session.endSession();
}
