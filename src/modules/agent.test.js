var express = require('express');
var router = express.Router(); 

router.get('/:testID', (req, res) => {
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

router.post('/:testID', (req, res) => {
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

router.patch('/:testID', (req, res) => {
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

router.delete('/:testID', (req, res) => {
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