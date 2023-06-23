const router = require('express').Router();
const workoutController = require('../controllers/workouts-controller.js');

router.route('/')
.get(workoutController.getAll)
.post(workoutController.add)

router.route("/:id")
.get(workoutController.findOne)
.put(workoutController.edit)
.delete(workoutController.remove)

router.route("/:id/exercises")
.get(workoutController.getOneWorkoutExercises)

module.exports = router;