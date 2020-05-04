require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const orderRoutes = require('./routes/order');
//Db connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(()=>{
    console.log('DB CONNECTED');
    
})

const port =8000;
const app = express();
//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

//Routes
app.use('/api', authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api', productRoutes);
app.use('/api',orderRoutes);




app.listen(port,()=>{
    console.log(`app is running at ${port}`);
    
})