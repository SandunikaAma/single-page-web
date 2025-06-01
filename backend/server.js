const express=require('express');
const cors =require('cors');
const app=express();
const orderRoutes=require("./routes/orders");

app.use(
    cors({
        origin:'http://15.207.114.235:3000'
    })
);
app.use(express.json());

app.use('/api/orders', orderRoutes);
app.listen(3009,()=>{
    console.log('Surver running on port 3009');
    
});