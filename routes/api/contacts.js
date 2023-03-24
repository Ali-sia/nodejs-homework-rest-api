const express = require('express');

const { contacts: ctrl } = require('../../controllers');
const { auth } = require('../../middlewares');

const router = express.Router();

router.get("/", ctrl.getAllContacts);
router.post("/", ctrl.postContact);

// router.use("/:contactId", checkContactId);

router.get("/:contactId", ctrl.getContactById);
router.put("/:contactId", ctrl.putContactUpdate);
router.delete("/:contactId", ctrl.deleteContactById);

router.patch("/:contactId/favorite", ctrl.patchFavouriteContact);

module.exports = router;
