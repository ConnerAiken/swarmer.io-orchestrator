var express = require('express');
var router = express.Router();

router.get('/:id', (req, res) => {
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
    res.send("Getting test runner status");
    return;
});

router.post('/:id', (req, res) => {
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

router.patch('/:id', (req, res) => {
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
    res.send("Adjusting test runner");
    return;
});

router.delete('/:id', (req, res) => {
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
    res.send("Removing test runner");
    return;
});

module.exports = router;