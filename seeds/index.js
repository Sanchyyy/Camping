const cities = require('./cities');
const mongoose = require('mongoose');
const Campground = require('../models/campgrounds');
const { descriptors, places } = require('./seedHelper');
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const dbUrl = process.env.DB_URL;


main().then(data => console.log('MONGO CONNECTED'));
main().catch(err => console.log(err));

async function main() {
    // 'mongodb://127.0.0.1:27017/yelp-camp'
    await mongoose.connect(dbUrl);

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            author: '664398a40241005aca5340a8',
            location: `${cities[random1000
            ].city},${cities[random1000
            ].state}`,
            title: `${sample(descriptors)}${sample(places)} `,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,

                ]
            },

            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione quo possimus ut est reiciendis id ex, officia cum, debitis laborum modi assumenda cupiditate ab provident, mollitia placeat eligendi sint eaque!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dvdt4hyb8/image/upload/v1715489861/YelpCamp/xngs23jrdbunodawuisn.jpg',
                    filename: 'YelpCamp/xngs23jrdbunodawuisn',

                },
                {
                    url: 'https://res.cloudinary.com/dvdt4hyb8/image/upload/v1715489866/YelpCamp/js4jggxbn7ypux0raa0l.jpg',
                    filename: 'YelpCamp/js4jggxbn7ypux0raa0l',

                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});