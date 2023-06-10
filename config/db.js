const mongoose=require('mongoose');
const connection=mongoose.connect('mongodb+srv://ashish:ashishpal@cluster0.2ahhjtl.mongodb.net/travel?retryWrites=true&w=majority');
module.exports = {connection}