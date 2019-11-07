'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

//npm run seed
const products = [
  {
    name: 'Vitelotte',
    price: '19999',
    description:
      'Vitelotte, is a gourmet French variety of blue-violet potato. It has been cultivated in France at least since the early 19th century.',
    origin: 'France',
    imageUrl:
      'http://cdn.webshopapp.com/shops/145216/files/240944855/potatoes-vitelotte-purple-per-100-gram.jpg'
  },
  {
    name: 'Belle de Fontenay',
    price: '8997',
    description:
      'A beautiful French first-early potato variety firm and waxy in texture. Perfect for Sunday lunches in late spring to early summer.',
    origin: 'France',
    imageUrl: 'http://www.doreoc.com/wp-content/uploads/2014/05/charlotte.jpg'
  },
  {
    name: 'Austrian Crescent',
    price: '29999',
    description:
      'A beautiful French first-early potato variety firm and waxy in texture. Perfect for Sunday lunches in late spring to early summer.',
    origin: 'Austrian',
    imageUrl:
      'https://smhttp-ssl-17653.nexcesscdn.net/media/catalog/product/cache/1/thumbnail/9df78eab33525d08d6e5fb8d27136e95/f/p/fp838-edit.jpg'
  },
  {
    name: 'Garnét',
    price: '34999',
    origin: 'Spain',
    description:
      'The garnet yam, named for its dark reddish-brown skin, is the variety you’re most likely to find in the produce section of the supermarket. It’s actually a sweet potato, and it’s so flavorful that it requires only a little cream and butter, and some tart lime juice.',
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81p7gmDa%2BrL._SL1500_.jpg'
  },
  {
    name: 'Okinawa',
    price: '100000',
    description:
      'Also known as Hawaiian Sweet Potato and Uala, the Okinawan Sweet Potato is tubular in shape. This vibrantly purple sweet potato, a locally grown staple of Hawaiian cuisine, is rich in flavor and packed with nutritional benefits.',
    origin: 'Hawaii',
    imageUrl:
      'https://www.friedas.com/wp-content/uploads/2019/05/Friedas_Okinawan-Sweet-Potato.jpg'
  },
  {
    name: "Kerr's Pink",
    price: '48999',
    description:
      'Kerr’s Pink is a potato in wide production in Ireland, often quoted as an “Irish potato” where it was introduced in 1917. A Kerr’s Pink potato is an irregular oval shape with distinctive pink colour and deep eyes. They are quite floury and starchy and are of good eating quality with a high dry matter.',
    origin: 'Scotland',
    imageUrl: 'http://www.specialtyproduce.com/sppics/16382.png'
  },
  {
    name: 'Bintje',
    price: '25599',
    description:
      'Bintje is a middle-early ripening potato variety bred in the Netherlands by the Frisian schoolmaster K.L. de Vries in 1904 from and marketed for the first time in 1910. The name of the potato, a diminutive of Benedict, was borrowed from one of his former students.',
    origin: 'Netherlands',
    imageUrl:
      'https://www.kartoffel-mueller.de/images/product_images/original_images/bintje.jpg'
  },
  {
    name: 'Blue Belle',
    price: '59999',
    description:
      'A mid season potato with yellow skin and purple splashes around the eyes and medium yellow flesh. Oval tubers with shallow eyes. Great when roasted, boiled, baked or mashed. Resistant to powdery scab, splitting and silver scurf.',
    origin: 'Canada',
    imageUrl:
      'https://www.legroupeclisson.fr/images/products/1000x750/71110.jpg'
  }
]

const users = [
  {
    name: 'Dwayne The Rock Johnson',
    email: 'therock@wwe.com',
    password: '1234'
  },
  {
    name: 'Kevin Hart',
    email: 'dwaynesbestie@funnyman.com',
    password: '5678'
  },
  {
    name: 'Ada Lovelace',
    email: 'alovelace@fullstack.com',
    password: 'fivehanover'
  },
  {
    name: 'Grace Hopper',
    email: 'admiral@usnavy.com',
    password: 'harvardmark'
  },
  {
    name: 'Alan Turing',
    email: 'aturing@princeton.edu',
    password: 'turochamp'
  }
]

async function seed() {
  await db.sync({force: true})

  await Promise.all(
    products.map(product => {
      return Product.create(product)
    })
  )

  await Promise.all(
    users.map(user => {
      return User.create(user)
    })
  )

  console.log('db synced!')
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
