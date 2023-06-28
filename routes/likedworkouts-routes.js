const router = require("express").Router();
const likesController = require('../controllers/likedworkouts-controller.js')

router.route('/')
.get(likesController.getAllWorkouts)
.post(likesController.add) 

router.route('/:workout_id/:user_id')
.get(likesController.findOne) 
.delete(likesController.remove)

module.exports = router;
