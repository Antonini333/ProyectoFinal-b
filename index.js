const express = require("express");
const mongoose = require("mongoose") ;

const app = express()

const MONGOUri = process.env.MONGOUri || "mongodb://localhost:27017/proyectofinal";
    mongoose.connect(MONGOUri,{useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false} )
    .then(()=>console.log('conected to Mongodb:' +MONGOUri))
    .catch(console.error)