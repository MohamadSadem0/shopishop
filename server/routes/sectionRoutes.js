const express = require("express")
const {  upload } = require('../cluodinaryMulter');
const { addSection,getSections ,updateSection} = require("../controllers/sectionController")

const router = express.Router()

router.post("/addSection", upload.single('image'),addSection);
router.get("/getSections",getSections);
router.put('/updateSection/:id',upload.single('image'),updateSection);


module.exports = router;