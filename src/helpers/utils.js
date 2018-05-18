export default {
    makeID() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
    },
    log(msg, type = 0) { 
        this.mockSlackIfNeeded();
 
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
    },
    loadENV() {
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
    },
    mockSlackIfNeeded() { 
        if(!global.slack) { var slack = {send: () => false}}
        else { var slack = global.slack; }
    }
}