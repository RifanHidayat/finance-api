const express = require("express");
const router = express.Router();
const controller = require("../controllers/AccountTransaction");
const routeDefault = "/api/v1/account-transaction";

router.post(`${routeDefault}`, controller.store);
router.get(`${routeDefault}`, controller.read);
router.patch(`${routeDefault}/:id`, controller.update);
router.delete(`${routeDefault}/:id`, controller.destroy);
router.get(`${routeDefault}/:id`, controller.read);

module.exports = router;
