var db = require('./models');





var pet_list = [
  {
  name: "Tock",
  type: "Dog",
  friendly: false
  },
  {
  name: "Trudie",
  type: "Dog",
  friendly: true
  }
];

// db.Pet.remove({}, function(err, pets){
//   if(err) {
//     console.log('Error occurred in remove', err);
//   } else {
//     console.log('removed all pets');

//     // create new records based on the array books_list
//     db.Pet.create(pet_list, function(err, pets){
//       if (err) { return console.log('err', err); }
//       console.log("created", pets.length, "pets");
//       process.exit();
//     });
//   }
// });