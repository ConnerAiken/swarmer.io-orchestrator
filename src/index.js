import utils from './helpers/utils';
import _ from "lodash";
utils.bootstrap();
  
const { digitalOcean, app, api } = utils;  
 
utils.log("~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-="); 
utils.log(":100: Service has been deployed and started! :100:"); 
utils.log(":100: Downloading account data from DigitalOcean.. :100: "); 
utils.log("~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-=~-="); 
 
 
utils.checkForUpdates(digitalOcean, api); 
setInterval(utils.checkForUpdates.bind(this, digitalOcean, api), 15000);  


// ███████╗███████╗██████╗ ██╗   ██╗███████╗    ██╗████████╗    
// ██╔════╝██╔════╝██╔══██╗██║   ██║╚══███╔╝    ██║╚══██╔══╝    
// ███████╗█████╗  ██████╔╝██║   ██║  ███╔╝     ██║   ██║       
// ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝ ███╔╝      ██║   ██║       
// ███████║███████╗██║  ██║ ╚████╔╝ ███████╗    ██║   ██║       
// ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝    ╚═╝   ╚═╝     
app.listen(process.env.port, () => utils.log(`:robot_face: Listening on port ${process.env.port}!`));
   