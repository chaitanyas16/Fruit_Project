const mongoose = require('mongoose');
const assert = require('assert');

// Connection URL - Creating a DB fruitsDB if not already created
mongoose.connect("mongodb://localhost:27017/fruitsDB",{useNewUrlParser: true,useUnifiedTopology: true});
//const url = 'mongodb://localhost:27017';
//Creating Schema for a Collection
const fruitSchema = new mongoose.Schema ({
  name : {
    type : String,
    required : [true, 'Please check your data entry! no name entered']
  },
  rating : {
    type : Number,
    min : 1,
    max : 10
  },
  review : String
});

// Create a new collection(table) Fruit in DB fruitDB
const Fruit = mongoose.model("Fruit", fruitSchema);
// Create a document(row) in the Fruit Collection
/* const fruit = new Fruit ({
  name: 'Apple',
  rating : 10,
  review : "Pretty Good fruit"
}); */

const pineapple = new Fruit ({
  name : "Pineapple",
  rating : 8,
  review : "Nice Fruit to eat"
});

const grapes = new Fruit({
  name : "Grapes",
  rating : 9,
  review : "Somtimes sour"
})

pineapple.save();
grapes.save();

//Save the fruit document in the Fruit Collection
//fruit.save();
const personSchema = new mongoose.Schema({
  name : String,
  age : Number,
  favouriteFruit : fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name : "Amy",
  age : 48,
  favouriteFruit : pineapple
});

person.save();

//Insert many documents in Collection

const kiwi = new Fruit({
  name : "kiwi",
  rating : 10,
  review : "The best"
});

const orange = new Fruit({
  name : "orange",
  rating : 6,
  review : "Good"
});

const banana = new Fruit({
  name : "banana",
  rating : 5,
  review : "Good fruit"
});
// Insert many fruit documents
/* Fruit.insertMany([kiwi,orange,banana],function(err){
  if (err)
  {
    console.log(err)
  } else
  {
    console.log('Successful Save of Fruits')
  }
}); */

Fruit.find(function(err,fruits){
  if(err){
    console.log(err);
  } else
  {
    mongoose.connection.close();
    fruits.forEach(function(fruit){
      console.log(fruit.name);

    });

  }
});

Person.updateOne({name : "John"}, {favouriteFruit : grapes},function(err){
  if(err) {
    console.log(err)
  } else
  {
    console.log('Successful update');
  }
});

/* Fruit.updateOne({_id : "5f288bd1bf97ab1160a8b70d"},{name : "Peach"},function(err){
  if (err)
  {
    console.log(err);
  } else
  {
    console.log("Updated Successfully");
  }
}); */

/* Fruit.deleteOne({_id : "5f288bedce4cfb309c371ae0"},function(err){
  if (err) {
    console.log(err);
  } else{
    console.log("successful deletion");
  }
}) */

/* Person.deleteMany({name : 'John'}, function(err){
  if (err) {
    console.log(err)
  } else {
    console.log("Successful many deletion")
  }
});*/



/*const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {
      name : "apple",
      score : 5,
      review: "Great"
    },
    {
      name : "orange",
      score : 6,
      review: "Very Good"
    },
    {
      name : "banana",
      score:7,
      review: "Good"
    }
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}


const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}
*/
