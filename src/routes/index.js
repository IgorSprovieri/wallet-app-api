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
router.get("/user", userController.get);

router.use(authMiddleware.validate);

router.put("/user", userController.put);
router.delete("/user", userController.delete);

router.post("/category", categoryController.post);
router.get("/categories", categoryController.get);
router.put("/category", categoryController.put);
router.delete("/category", categoryController.delete);

router.post("/finance", financeController.post);
router.get("/finances", financeController.get);
router.delete("/finance/:id", financeController.delete);

module.exports = router;
