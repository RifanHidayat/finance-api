const express = require("express");
const router = express.Router();
const controller = require("../controllers/CategoryController");
const routeDefault = "/api/v1/category";

router.post(`${routeDefault}`, controller.store);
router.get(`${routeDefault}`, controller.read);
router.patch(`${routeDefault}/:id`, controller.update);
router.delete(`${routeDefault}/:id`, controller.destroy);

module.exports = router;
