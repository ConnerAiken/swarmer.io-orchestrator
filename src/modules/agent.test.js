var express = require('express');
var router = express.Router();

var digitalOcean = global.digitalOcean;

router.get('/:id', (req, res) => {
    // ================
    // Request Check
    // ============= 
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