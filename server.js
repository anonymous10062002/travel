const express=require('express');
const cors=require('cors');
const {connection}=require('./config/db');
const {TravelModel}=require('./model/TravelModel');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('Welcome to Travel App');
})

app.get('/travel/posts', async(req,res) => {
    try {
        let { sort, destination } = req.query;
        let data = await TravelModel.find();
        if (destination) {
            data = data.filter((doc) => doc.destination === destination);
        }
        if (sort==='budget') {
            data.sort((x,y) => x.budget - y.budget);
        }
        return res.json(data);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
  
app.post('/travel/posts', async(req,res) => {
    const { name, email, destination, travelers, budget } = req.body;
    try {
        const travel = new TravelModel({name,email,destination,travelers,budget});
        await travel.save();
        res.status(200).send('Posted Successfully');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
  
app.delete('/travel/posts/:id',async(req,res) => {
    const {id} = req.params;
    try {
        await TravelModel.findByIdAndDelete(id);
        res.status(200).send('Deleted Successfully');
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});
  

app.listen(4000,async()=>{
    try {
        await connection;
    } catch (error) {
        console.log(error);
    }
    console.log('listening on port 4000');
})