const knex = require("knex")(require("../knexfile"));
const fs = require('fs');
const path = require('path');

const deleteImage = (imagePath) => {
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error('Error deleting image file:', err);
      } else {
        console.log('Image file deleted');
      }
    });
};

const getAll = (_req, res) => {
  knex("workout")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving Workouts: ${err}`));
};

const findOne = (req, res) => {
  knex("workout")
    .where({ id: req.params.id })
    .then((workoutsFound) => {
      if (workoutsFound.length === 0) {
        return res
          .status(404)
          .json({ message: `Workout with ID: ${req.params.id} not found` });
      }

      const workoutData = workoutsFound[0];

      res.status(200).json(workoutData);
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to retrieve data for workout with ID: ${req.params.id}`,
      });
    });
};

const getOneWorkoutExercises = (req, res) => {
  knex("workout")
    .leftJoin("exercise", "workout.id", "exercise.workout_id")
    .select(
      "exercise.id",
      "exercise.name",
      "exercise.muscle",
      "exercise.equipment",
      "exercise.difficulty",
      "exercise.instructions"
    )
    .where({ "workout.id": req.params.id })
    .then((response) => {
      if (response.length === 0) {
        return res.status(404).json({
          message: `The workout with id ${req.params.id} or cannot be found`,
        });
      } else if (!response[0].id) {
        return res.status(400).json({message:`The workout with the id ${req.params.id} exists but is empty`} );
      }
      return res.status(200).json(response);
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "An error in your request has occured." });
    });
};

const add = (req, res) => {
    if (
        !req.body.name ||
        !req.body.type ||
        !req.body.likes ||
        !req.body.comments ||
        !req.file
    ) {
       
        return res
          .status(400)
          .send("Please provide all info for the new workout, including the image in the request");
    }

    console.log(req.file)

    const workout = {
      name: req.body.name,
      type: req.body.type,
      image: 'https://gym-junkie-backend-visagans.onrender.com/images/' + req.file.filename,
      likes: req.body.likes,
      comments: req.body.comments
    };

    knex("workout")
      .insert(workout)
      .then(() => {
        res.status(201).json(workout);
      })
      .catch(() => {
        res.status(500).json({ message: "Unable to create new workout" });
      });
};

const remove = (req, res) => {
    knex("workout")
    .where({ id: req.params.id })
    .then((workoutsFound) => {
      if (workoutsFound.length === 0) {
        return res
          .status(404)
          .json({ message: `Workout with ID: ${req.params.id} not found` });
      }

      const workoutData = workoutsFound[0];
      let imageAddress = workoutData.image.replace(new RegExp('https://gym-junkie-backend-visagans.onrender.com/images/', 'g'), '');
      const imagePath = path.join(__dirname, '..', 'public/images', imageAddress)
      deleteImage(imagePath);

      knex("workout")
      .where({ id: req.params.id })
      .del()
      .then((result) => {
        if (result === 0) {
          return res.status(404).json({
            message: `Workout with ID: ${req.params.id} to be deleted not found`,
          });
        }
        res.sendStatus(204);
      })
      .catch(() => {
        res.status(500).json({ message: "Unable to delete workout" });
      });
      
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to retrieve data for workout with ID: ${req.params.id}`,
      });
    });
};

const edit = (req, res) => {
  if (
    !req.body.name ||
    !req.body.type ||
    !req.body.likes ||
    !req.body.comments
  ) {
    return res.status(400).json({
      message: `Unable to update ${req.body.name} workout please ensure all fields have been filled out`,
    });
  }

  let workout = {};

  if(req.file){

    knex("workout")
        .where({ id: req.params.id })
        .then((workoutsFound) => {
        if (workoutsFound.length === 0) {
        return res
          .status(404)
          .json({ message: `Workout with ID: ${req.params.id} not found` });
        }

      const workoutData = workoutsFound[0];
      let imageAddress = workoutData.image.replace(new RegExp('https://gym-junkie-backend-visagans.onrender.com/images/', 'g'), '');
      const imagePath = path.join(__dirname, '..', 'public/images', imageAddress);
      console.log(imagePath);
      deleteImage(imagePath);
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to retrieve data for workout with ID: ${req.params.id}`,
      });
    });

         workout = {
            name: req.body.name,
            type: req.body.type,
            image: 'https://gym-junkie-backend-visagans.onrender.com/images/' + req.file.filename,
            likes: req.body.likes,
            comments: req.body.comments
        };
    } else {
        workout = {
            name: req.body.name,
            type: req.body.type,
            likes: req.body.likes,
            comments: req.body.comments
        }
    }
  knex("workout")
    .where({ id: req.params.id })
    .update(workout)
    .then(() => {
      return knex("workout").where({ id: req.params.id });
    })
    .then((editedWorkout) => {
      if (editedWorkout.length === 0) {
        return res.status(404).json({ message: "Workout not found" });
      }
      res.status(200).json(editedWorkout);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};

module.exports = {
  getAll,
  findOne,
  getOneWorkoutExercises,
  add,
  remove,
  edit,
};
