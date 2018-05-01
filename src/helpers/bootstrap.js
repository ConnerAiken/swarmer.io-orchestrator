import utils from "./utils.js";
import path from "path";
import dotenv from "dotenv";


global.path = path;
global.dotenv = dotenv;
global.utils = utils;
 
utils.loadENV(); 