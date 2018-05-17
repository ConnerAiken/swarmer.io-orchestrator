import utils from "./utils.js";
import path from "path";
import dotenv from "dotenv";
import DigitalOcean from "do-wrapper";
import express from "express";
import bodyParser from "body-parser";

global.express = express;
global.path = path;
global.dotenv = dotenv;
global.utils = utils;
 
utils.loadENV(); 
 
global.api = new DigitalOcean(process.env.doApiKey, process.env.doPageSize);

global.app = express();
global.app.use(bodyParser.json());
global.app.use(bodyParser.urlencoded({
    extended: true
}))