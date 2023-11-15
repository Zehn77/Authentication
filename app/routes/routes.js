
const express = require('express');
const router  = express.Router();
const authJwt = require("../middlewares/jwt");


const controller = require('../controllers/controller')

router.get('/books', [authJwt.verifyToken], controller.getBooks)
router.post('/registration', controller.registr)
router.delete('/phones', controller.removePhone)
router.post('/login', controller.login)
router.post('/books', [authJwt.verifyToken], controller.addBook)

module.exports = router