const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://mernbhanu:mern3924@cluster0.ejtqpfk.mongodb.net/mernapp?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        // Accessing the collection
        const foodItemsCollection = await mongoose.connection.db.collection('food_items');
        const foodCategoryCollection =await mongoose.connection.db.collection('foodCategory'); // Assuming you have a foodCategory collection

        // Finding all documents in the collections
        const foodItemsData = await foodItemsCollection.find({}).toArray();
        const foodCategoryData = await foodCategoryCollection.find({}).toArray(); // Assuming you want to fetch all categories

        // Setting global variables
        global.food_items = foodItemsData;
        global.foodCategory = foodCategoryData;

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process with a failure code
    }
}

module.exports = mongoDB;
