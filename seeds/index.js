
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
mongoose.connect("mongodb+srv://admin-numan:hello@cluster0.asyoc.mongodb.net/mydesicamp?retryWrites=true&w=majority", {
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
    // await Campground.deleteMany({});
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '61e711ce6e2b4e5070f7dbc4',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dywjwz6rl/image/upload/w_400,h_300/v1642791560/mydesicamp/zqkb0fhuym10janr3gta_i0gcqa.jpg',
                    filename: 'mydesicamp/zqkb0fhuym10janr3gta_i0gcqa'
                },
                {
                    url: 'https://res.cloudinary.com/dywjwz6rl/image/upload/w_400,h_300/v1642791624/mydesicamp/river_image_sakedx.jpg',
                    filename: 'mydesicamp/river_image_sakedx'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})