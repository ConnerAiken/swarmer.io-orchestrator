import utils from './helpers/utils';
import _ from "lodash";
utils.bootstrap();
 
const promises = [];
const { digitalOcean, app, api } = utils;  
 
utils.log(":four_leaf_clover: :four_leaf_clover: :four_leaf_clover: :four_leaf_clover: :four_leaf_clover: :four_leaf_clover: :four_leaf_clover: :four_leaf_clover: "); 
utils.log(":100: Service has been deployed and started! :100:"); 
utils.log(":100: Downloading account data from DigitalOcean.. :100: ");
utils.log(":100: Service has been deployed and started! :100:"); 
utils.log(":four_leaf_clover: :four_leaf_clover: :four_leaf_clover: :four_leaf_clover: :four_leaf_clover: :four_leaf_clover: :four_leaf_clover: :four_leaf_clover: "); 

let intervalMilis = 0;
setInterval(() => {
    // 0. Get account/droplet info 
    promises.push(api.account().then((data) => {
        utils.log(`:thinking_face: Received ${Object.keys(data.body).length} fields about the service account.`);
        digitalOcean.account = data.body;  
    }));
    
    // 1. Get recent actions
    promises.push(api.accountGetActions({includeAll: true}).then((data) => { 
        utils.log(`:thinking_face: Received ${data.body.length} recent events.`);
        digitalOcean.recentActions = data.body;  
    }));
    
    // 2. get list of all droplets
    promises.push(api.dropletsGetAll({includeAll: true}).then((data) => {
        utils.log(`:thinking_face: Received ${data.body.length} droplet data.`);
        digitalOcean.droplets = data.body.filter(d => _.includes(d.tags, 'swarmerio-node')); 
    })); 

    // 3. Fulfill promises and do sumthin
    Promise.all(promises).then(() => {
        console.log(digitalOcean.droplets); 
    });

    // 4. Set interval to 15 seconds if 0, otherwise let it be incase we manip
    intervalMilis = intervalMilis === 0 ? 15000 : intervalMilis;

}, intervalMilis);  


// ███████╗███████╗██████╗ ██╗   ██╗███████╗    ██╗████████╗    
// ██╔════╝██╔════╝██╔══██╗██║   ██║╚══███╔╝    ██║╚══██╔══╝    
// ███████╗█████╗  ██████╔╝██║   ██║  ███╔╝     ██║   ██║       
// ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝ ███╔╝      ██║   ██║       
// ███████║███████╗██║  ██║ ╚████╔╝ ███████╗    ██║   ██║       
// ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝    ╚═╝   ╚═╝     
app.listen(process.env.port, () => utils.log(`:cumbical_chick: Listening on port ${process.env.port}!`));
   