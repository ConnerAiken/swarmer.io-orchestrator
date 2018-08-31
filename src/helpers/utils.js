import dotenv from "dotenv";
import path from "path"; 
import DigitalOcean from "do-wrapper";
import express from "express";
import bodyParser from "body-parser";
import SlackWebhook from "slack-webhook";

class Utils {
    static bootstrap() {   
            this.loadENV(); 
            
            this.api = new DigitalOcean(process.env.doApiKey, process.env.doPageSize);
            this.digitalOcean = {
                account: {},
                recentActions: [],
                droplets: [],
                images: []
            };
            this.slack = new SlackWebhook(process.env.slackWebhook, {
                defaults: {
                username: process.env.appName,
                channel: '#orchestrator-log',
                icon_emoji: ':robot_face:'
                }
            }); 

            this.app = express();
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({
                extended: true
            }));
            this.app.use(this.expressLog);
            // Routes -- config must be defined prior to importing
            this.app.use("/agent", require('./../modules/agent'));
            this.app.use("/agent/:agentID/test", require('./../modules/agent.test')); 

    }
 
    static makeID() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    }
    static expressLog(err, req, res, next) { 
        if (res.headersSent) {
            return next(err);
        }

        this.log(err, 2);
        
        res.status(500);
        res.render('error', { error: err })  ;
    }
    static log(msg, type = 0) { 
        var slack = this.slack ? this.slack : {send: () => false};
 
        if(type === 1) {
            console.warn(`[${process.env.appName}] ${msg}`); 
                slack.send({
                    text: msg,  
                    icon_emoji: ':scream_cat:'
                }); 
        }else if(type === 2) {
            console.error(`[${process.env.appName}] ${msg}`);
            slack.send({
                text: msg,  
                icon_emoji: ':scream_cat:'
            });
        }else {
            console.log(`[${process.env.appName}] ${msg}`);
            slack.send(msg);
        }
    }
    static loadENV() {
        const defaultConfig = dotenv.config({
            path: path.resolve(process.cwd(), '.env')
        });
        const config = dotenv.config(); 

        if (config.error && !defaultConfig.error) {
            this.log("Could not find .env file, using default env file..");
        }else if(config.error && defaultConfig.error) {
            this.log("Could not find any .env files, please set one up!", 1);
        }else {
            this.log("Successfully loaded .env variables..");
        }
    }
}

export default Utils;