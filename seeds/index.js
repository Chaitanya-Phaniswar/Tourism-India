const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken=process.env.MAPBOX_TOKEN
const geoCoder= mbxGeocoding({accessToken: 'pk.eyJ1IjoiY2hhaS10dSIsImEiOiJjbGp5NnJtbzMwMmllM2lsaHJlcjVycTl4In0.hlqhGwEjTvw5iRhCVxkC7w'})
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 150; i++) {
        const random1000 = Math.floor(Math.random() * 200);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64abf10c73dc9a0a0cd22144',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].lon,cities[random1000].lat]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/da3drry5t/image/upload/v1689070725/YelpCamp/umway6xwrexuj9r7lobi.jpg',
                  filename: 'YelpCamp/umway6xwrexuj9r7lobi'
                },
                {
                  url: 'https://res.cloudinary.com/da3drry5t/image/upload/v1689072236/YelpCamp/zyv2tifumrcay1rqm3na.jpg',
                  filename: 'YelpCamp/zyv2tifumrcay1rqm3na'
                }
              ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
// how to connect to mongo
