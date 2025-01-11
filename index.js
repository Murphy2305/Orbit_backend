const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectDB = require('./Config/db');
const { urlencoded } = require('body-parser');
const {notFound, errorHandler} = require('./Middleware/errorMiddleware');
const userRoute = require('./Routes/userRoute');
const transcationRoute = require('./Routes/transcationRoute');


// comments are required
// Middleware
app.use(cors()); 
app.use(express.json()); 
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))



//Connecting to database
connectDB();


const PORT = process.env.PORT||6000;

app.get('/',(req,res)=>{
    console.log("hii");  
    res.end('hiii');
})

app.use('/user', userRoute);
app.use('/transcation', transcationRoute);



//error Handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});