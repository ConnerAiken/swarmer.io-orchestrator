var express = require('express');
var router = express.Router(); 

// Listen for events
router.post('/', (req, res) => {  
    // ================
    // Request Check
    // =============
    console.log(req);
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

router.get('/:id', (req, res) => {  
    // ================
    // Request Check
    // ============= 
 
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
    res.send("Getting the status from the agent");
    return;
});

router.patch('/:id', (req, res) => {  
    // ================
    // Request Check
    // ============= 
 
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
    res.send("Adjusting the agent");
    return;
});

router.delete('/:id', (req, res) => { 
    // ================
    // Request Check
    // ============= 
 
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
 

module.exports = router;