import utils from "./utils.js";
import path from "path";
import dotenv from "dotenv";
import DigitalOcean from "do-wrapper";
import express from "express";
import bodyParser from "body-parser";
import SlackWebhook from "slack-webhook";

global.express = express;
global.path = path;
global.dotenv = dotenv;
global.utils = utils;
 
utils.loadENV(); 
 
global.api = new DigitalOcean(process.env.doApiKey, process.env.doPageSize);
global.slack = new SlackWebhook(process.env.slackWebhook, {
    defaults: {
      username: process.env.appName,
      channel: '#orchestrator-log',
      icon_emoji: ':robot_face:'
    }
});

global.app = express();
global.app.use(bodyParser.json());
global.app.use(bodyParser.urlencoded({
    extended: true
}));
global.app.use(utils.expressLog);
// Routes -- config must be defined prior to importing
global.app.use("/agent", require('./../modules/agent'));
global.app.use("/agent/:agentID/test", require('./../modules/agent.test')); 