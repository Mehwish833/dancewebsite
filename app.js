const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 8000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dancecontact', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("Failed to connect to MongoDB", err));

// Define Mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    firstname: String
});
const Contact = mongoose.model('Contact', contactSchema);

// Middleware
app.use('/static', express.static('static')); // Serving static files
app.use(express.urlencoded({ extended: true })); // Parse form data

// PUG setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'template'));

// Routes
app.get('/', (req, res) => {
    res.status(200).render('home.pug');
});
app.get('/contact', (req, res) => {
    res.status(200).render('contact.pug');
});
app.post('/contact', async (req, res) => {
    try {
        const myData = new Contact(req.body);
        await myData.save();
        res.send("This item has been saved to the database");
    } catch (error) {
        res.status(400).send("Item was not saved to the database");
    }
});
app.get('/services', (req, res) => {
    res.status(200).render('services.pug');
});
app.get('/about', (req, res) => {
    res.status(200).render('about.pug');
});
app.get('/classinfo', (req, res) => {
    res.status(200).render('classinfo.pug');
});

// Start the server
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
