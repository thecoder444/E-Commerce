const router = require("express").Router();
const UserController = require("../controller/user");
const adminController = require("../controller/admin");
const uploads = require("../middleware/multer");
const auth = require("../middleware/auth");

router.get("/", (req,res) => {
    res.send("Hello Backend")
})
router.post("/regdata",UserController.regDataController)
router.post("/loginuser", UserController.loginDataController)
router.post("/addadminproduct", uploads.single("image"), adminController.addadminproductController)
router.get("/useralldata",adminController.getAllProductsController )
router.delete("/productdelete/:id", adminController.deleteProductController)
router.get("/editvaluedata/:abc", adminController.editvaluedataController)
router.put("/productupdate/:abc", adminController.updateproductController)
router.get("/userproducts", UserController.userAllProducts)
router.post("/userquery",UserController.userQueryController)
router.get("/userallquery", adminController.userAllQuery)
router.delete("/deletequery/:abc", adminController.deletequeryController)
router.get("/querysingledata/:id", adminController.singleQueryController)
router.post("/mailreply/:abc", adminController.mailReplyController)
router.post("/cart/save",auth,  UserController.saveCartController)
router.get("/cart/:userId", auth , UserController.getCartController)
router.get("/search", UserController.searchController)
router.post("/create-order", UserController.orderController)
router.post("/verify",auth, UserController.verifyController)
module.exports = router;