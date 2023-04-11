var express = require("express");
var router = express.Router();

const groceries = require("../app/controllers/grocery.controller");

router.get("/", groceries.list);
router.post("/create", groceries.create);
router.get("/:id", groceries.getGrocery);
router.put("/:id", groceries.update);
router.delete("/:id", groceries.delete);

module.exports = router;
