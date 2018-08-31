import utils from './helpers/utils';
utils.bootstrap();
 
const promises = [];
const { digitalOcean, app, api } = utils;  
 
utils.log("Service has been deployed and started!"); 
utils.log("Downloading account data from DigitalOcean..");

// 0. Get account/droplet info
promises.push(api.account().then((data) => {
    utils.log(`Received ${Object.keys(data.body).length} fields about the service account.`);
    digitalOcean.account = data.body; 
    console.log(digitalOcean.account); 
}));

// 1. Get recent actions
promises.push(api.accountGetActions({includeAll: true}).then((data) => { 
    utils.log(`Received ${data.body.length} recent events.`);
    digitalOcean.recentActions = data.body; 
    console.log(digitalOcean.recentActions);
}));

// 2. get list of all droplets
promises.push(api.dropletsGetAll({includeAll: true}).then((data) => {
    utils.log(`Received ${data.body.length} droplet data.`);
    digitalOcean.droplets = data.body;
    console.log(digitalOcean.droplets);
})); 
 
Promise.all(promises).then(() => {
    app.listen(process.env.port, () => utils.log(`Listening on port ${process.env.port}!`));
}).catch((err) => {
    utils.log(`Error! ${err}`)  
});