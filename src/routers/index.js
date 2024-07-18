const { Router } = require("express");
const { userController } = require("../modules/user/user.controller");
const { financeController } = require("../modules/finances/finance.controller");
const { authMiddleware } = require("../modules/auth/auth.middleware");
const { authController } = require("../modules/auth/auth.controller");

const {
  categoryController,
} = require("../modules/category/category.controller");

const router = Router();

router.get("/", (req, res) => {
  res.send("It is a wallet app API");
});

router.post("/login", authController.login);
router.post("/user", userController.post);
router.get("/user", userController.get);

router.use(authMiddleware.validate);

router.put("/user", userController.put);
router.delete("/user", userController.delete);

router.post("/category", categoryController.post);
router.get("/categories", categoryController.get);
router.put("/category/:id", categoryController.put);
router.delete("/category/:id", categoryController.delete);

router.post("/finance", financeController.post);
router.get("/finances", financeController.get);
router.put("/finance/:id", financeController.put);
router.delete("/finance/:id", financeController.delete);

module.exports = router;
