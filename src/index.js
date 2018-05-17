import './helpers/bootstrap';
 
const digitalOcean = {
    account: {

    },
    recentActions: [

    ],
    droplets: [

    ],
    images: [

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
    // ================
    // Request Check
    // =============
    if(!req.body.account || !req.body.plan) { 
        res.send("Invalid request.");
        return;
    }
 
    // ================
    // Business logic check
    // =============
    const fields = {
        relevantDroplets: digitalOcean.droplets.filter((d) => d.tags.includes(req.body.account)) || []
    };
    const flags = {
        hasRelevantDroplets: fields.relevantDroplets.length > 0
    }

    if(flags.hasRelevantDroplets) {
        res.send("You already have droplets");
        return;
    }

    // ================
    // Action
    // =============
    const agentConfig = {
        name: req.body.account + '-' + utils.makeID(),
        monitoring: true,
        private_networking: true,
        backups: false,
        region: "sfo2",
        size: "s-1vcpu-1gb",
        image: "34430407",
        tags: ['agent', req.body.account]
    };

    console.log("Attempting to create droplet with ", agentConfig);

    api.dropletsCreate(agentConfig).then((response) => {
        digitalOcean.droplets.push(response.body.droplet);
        res.send(response.body.droplet);
        return;
    }).catch((err) => { 
        res.send(err);
        return;
    });
});

app.post('/deregister', (req, res) => { 
    // ================
    // Request Check
    // =============
    if(!req.body.account) { 
        res.send("Invalid request.");
        return;
    } 

 
    // ================
    // Business logic check
    // =============
    let relevantDroplets = digitalOcean.droplets.filter((droplet) => droplet.tags.includes(req.body.account));
    let requests = [];

    if(relevantDroplets.length === 0) {
        res.send("No droplets to remove.");
        return;
    }

    // ================
    // Action
    // ============= 
    relevantDroplets.forEach((droplet) => {
        requests.push(api.dropletsDelete(droplet.id));
    });
 
    Promise.all(relevantDroplets).then(() => {
        res.send('All droplets removed.');
        return;
    }).catch((err) => {
        res.send(err);
        return;
    });
});

app.post('/queue', (req, res) => {
    // ================
    // Request Check
    // =============
    if(!req.body.account || !req.body.runners) { 
        res.send("Invalid request.");
        return;
    } 
    // ================
    // Business logic check
    // ============= 
    
    // ================
    // Action
    // ============= 
    res.send("Queueing test runner");
    return;
});

app.listen(3000, () => utils.log('Listening on port 3000!'));