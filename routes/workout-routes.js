const router = require('express').Router();
const workoutController = require('../controllers/workouts-controller.js');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images'); // Specify the destination directory
    },
    filename: function (req, file, cb) {
      cb(null, 'image' + Date.now() + '.jpg'); // Generate a unique filename
    }
});

const upload = multer({ storage: storage });

router.route('/')
.get(workoutController.getAll)
.post(upload.single('image'), workoutController.add)

router.route("/:id")
.get(workoutController.findOne)
.put(upload.single('image'), workoutController.edit)
.delete(workoutController.remove)

router.route("/:id/exercises")
.get(workoutController.getOneWorkoutExercises)

module.exports = router;