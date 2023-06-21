const router = require("express").Router();
const exerciseController = require('../controllers/exercises-controller.js')

router.route('/')
.get(exerciseController.getAll)
.post(exerciseController.add) 

router.route('/:id')
.get(exerciseController.findOne)
.put(exerciseController.edit)
.delete(exerciseController.remove)

module.exports = router;
