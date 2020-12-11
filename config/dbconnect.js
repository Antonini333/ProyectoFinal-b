const express = require("express");
const mongoose = require("mongoose") ;

const app = express()

const MONGOUri = process.env.MONGOUri || "mongodb+srv://antonini-333:juventus21@clusterpablo.6opsi.mongodb.net/proyectofinal";
    mongoose.connect(MONGOUri,{useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false} )
    .then(()=>console.log('conected to Mongodb:' +MONGOUri))
    .catch(console.error)