const router = require("express").Router();
const Portfolio = require("../models/Portfolio");

router.get("/portfoliodata", async (req, res) => {
    if(req.headers.key !== process.env.UPDATE_KEY) {
        return res.status(401).send("Access Denied");
    }

    try {
        const portfolio = await Portfolio.findOne({ user: req.headers._id });

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