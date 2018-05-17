import './helpers/bootstrap';
 
const digitalOcean = {
    account: {

    },
    recentActions: [

    ],
    droplets: [

    ]
};

// 0. Get account/droplet info
api.account().then((data) => {
    digitalOcean.account = data.body;
});

// 1. Get recent actions
api.accountGetActions({includeAll: true}).then((data) => { 
    digitalOcean.recentActions = data.body.actions;
});

// 2. get list of all droplets
api.dropletsGetAll({includeAll: true}).then((data) => {  
    digitalOcean.droplets = data.body;
});


// Listen for events
app.post('/register', (req, res) => {
    if(!req.body.account || req.body.plan) { 
        res.send("Invalid request.");
    } 
});

app.post('/deregister', (req, res) => {
    if(!req.body.account) { 
        res.send("Invalid request.");
    } 
});

app.post('/queue', (req, res) => {
    if(!req.body.account || req.body.runners) { 
        res.send("Invalid request.");
    }
    
    res.send("Queueing test runner");
});

app.listen(3000, () => console.log('Listening on port 3000!'));