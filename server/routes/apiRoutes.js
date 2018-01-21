const router = require("express").Router();

router.route("/test")
  .get((req,res) => {
    res.json("api test");
  });

module.exports = router;
