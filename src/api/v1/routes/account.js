const express = require("express");
const router = express.Router();
const controller = require("../controllers/AccountController");
const routeDefault = "/api/v1/account";

router.post(`${routeDefault}`, controller.store);
router.get(`${routeDefault}`, controller.read);
router.patch(`${routeDefault}/:id`, controller.update);
router.delete(`${routeDefault}/:id`, controller.destroy);
router.get(`${routeDefault}/category`, controller.category);
router.get(`${routeDefault}/:id/transactions`, controller.transactions);

module.exports = router;
