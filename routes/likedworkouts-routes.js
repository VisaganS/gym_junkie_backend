const router = require("express").Router();
const likesController = require('../controllers/likedworkouts-controller.js')

router.route('/')
.post(likesController.add)

router.route('/:id')
.get(likesController.getAllWorkouts)

router.route('/:workout_id/:user_id')
.get(likesController.findOne) 
.delete(likesController.remove)

module.exports = router;
