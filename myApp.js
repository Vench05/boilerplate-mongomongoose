require('dotenv').config();
const mongoose = require('mongoose')
const { Schema } = mongoose
const MONGO_URI = process.env.MONGO_URI
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})


const personSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  age: Number,
  favoriteFoods: []
})

let Person = mongoose.model('Person', personSchema)

const createAndSavePerson = (done) => {
  person = new Person({
    name: "Ralf",
    age: 23,
    favoriteFoods: ['Mango', 'Shake']
  })
  person.save((err, data) => {
    if(err) return done(err)
    done(null, data);
  })
  // done(null /*, data*/);
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(data)
    done(null, data);
  })
};

const findPeopleByName = async (personName, done) => {
  const person = await Person.find({name: personName})
  done(null, person);
};

const findOneByFood = async (food, done) => {
  const person = await Person.findOne({favoriteFoods: food})
  done(null, person);
};

const findPersonById = async (personId, done) => {
  const person = await Person.findById(personId)
  done(null, person /*, data*/);
};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";
  let person = await Person.findById(personId)
  console.log(person.favoriteFoods);
  person.favoriteFoods.push(foodToAdd)
  person.save((err, data) => {
    if (err) return done(data)
    done(null, data)
  })
};

const findAndUpdate = async (personName, done) => {
  const ageToSet = 20;
  const person = await Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new:true})
  person.save((err, data) => {
    if(err) return done(data)
    done(null, data)
  })
};

const removeById = async (personId, done) => {
  const person = await Person.findByIdAndRemove(personId)
  done(null, person /*, data*/);
};

const removeManyPeople = async (done) => {
  const nameToRemove = "Mary";
  const persons = await Person.remove({name: nameToRemove})
  done(null, persons);
};

const queryChain = async (done) => {
  const foodToSearch = "burrito";
  const person = await Person.find({favoriteFoods: foodToSearch}).sort("name").limit(2).select('-age')
      .exec((err, data) => {
        if(err) return done(data)
        return done(null, data)
      })
  // done(null, person);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
