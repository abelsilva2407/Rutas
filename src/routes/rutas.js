const {Router} = require('express');
const router = Router();

// const express = reqquire('express');
// const router = express.router;

router.get('/', (req, res) => {
    res.json({"name": "John Doe"});
});

module.exports = router;