const router = require("express").Router();
const Portfolio = require("../models/Portfolio");
const protect = require("../middleware/authMiddleware");

router.get("/portfoliodata",protect, async (req, res) => {

    try {
        if(!req.user) {
            return res.status(401).send({message : "Unauthorized"});
        }
        const portfolio = await Portfolio.findOne({ user: req.user._id });
        
        if(!portfolio) {
            return res.status(201).send({message : "Portfolio not found"});
        }

        res.send(portfolio);

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;