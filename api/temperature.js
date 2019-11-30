const express = require('express');
const db = require('../database');

const router = express.Router();

router.get("/", (req, res, next) => {
    db.query(`SELECT * FROM (
        SELECT * FROM temperature ORDER BY date DESC LIMIT 50
    ) sub
    ORDER BY date ASC;`)
        .then((data) => {
            res.status(200).json({
                data
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;