// const person = {
//     age: 25,
//     location: {
//         city: 'Colombo',
//         temp: 34
//     } 
// };

// const { name: firstName = 'Anonymous', age } = person;
// console.log(`${firstName} is ${age}.`);

// const {city, temp:temperature} = person.location;
// if (city && temperature) {
//     console.log(`It's ${temperature} in ${city}`);
// }

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const {name: publisherName = 'Self-Published'} = book.publisher

// console.log(publisherName);

const address = ['1299 S Juniper Street', 'Colombo', 'Sri Lanka', '10120'];

const [, city, country = 'Hawaii'] = address;

console.log(`You are in ${city} ${country}`);

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [description, , mediumCoffee] = item;

console.log(`A medium ${description} costs ${mediumCoffee}`);