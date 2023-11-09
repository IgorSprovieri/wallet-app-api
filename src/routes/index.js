const express = require("express");
const { userController } = require("../controllers/user");
const { categoryController } = require("../controllers/category");
const { financeController } = require("../controllers/finance");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("It is a wallet app API");
});

router.post("/user", userController.post);

router.use(authMiddleware.validate);

router.put("/user", userController.put);
router.delete("/user", userController.delete);
router.get("/categories", categoryController.get);

router.get("/finances", financeController.get);
router.post("/finance", financeController.post);
router.delete("/finance/:id", financeController.delete);

module.exports = router;
