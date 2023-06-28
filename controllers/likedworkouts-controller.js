const knex = require("knex")(require("../knexfile"));

const findOne = (req, res) => {
    const workoutId = req.params.workout_id;
    const userId = req.params.user_id;
    knex("likedworkouts")
      .where({ user_id: userId, workout_id: workoutId  })
      .then((likesFound) => {
        if (likesFound.length === 0) {
          return res
            .status(404)
            .json({ message: `Likes with workout_id: ${workoutId} and user_id: ${userId} not found` });
        }
        const likesData = likesFound[0];
        res.status(200).json(likesData);
      })
      .catch(() => {
        res.status(500).json({
          message: `Unable to retrieve data for likes with workout_id: ${workoutId} and user_id: ${userId}`,
        });
      });
  };

const getAllWorkouts = (req, res) => {
    knex("likedworkouts")
    .join("workout", "likedworkouts.workout_id", "workout.id")
    .select(
      "workout.id",
      "workout.name",
      "workout.type",
      "workout.image",
      "workout.likes",
      "workout.comments"
    )
    .where("likedworkouts.user_id", req.params.id )
    .then((response) => {
        if (response.length === 0) {
          return res.status(404).json({
            message: `No liked workouts found for user with ID ${req.params.id}`,
          });
        }
        return res.status(200).json(response);
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "An error in your request has occurred." });
      });
  };

const add = (req,res) => {
    if (
        !req.body.user_id||
        !req.body.workout_id
      ) {
        return res
          .status(400)
          .send({ message: "Missing field values" });
      }

      const likedWorkout = {
        user_id: req.body.user_id,
        workout_id: req.body.workout_id
      }

      return knex("likedworkouts")
        .insert(likedWorkout)
        .then(() => {
          return res
            .status(201)
            .json({ message: "Successfully added liked Workout item" });
        });
}

const remove = (req, res) => {
    const workoutId = req.params.workout_id;
    const userId = req.params.user_id;
    knex("likedworkouts")
    .where({ workout_id: workoutId, user_id: userId })
    .del()
    .then((result) =>{
        if (result === 0) {
            return res.status(404).json({
              message: `Likes with workout_id: ${workoutId} and user_id: ${userId} not found`,
            });
        }
        res.status(204).json({ message:  `Likes with workout_id: ${workoutId} and user_id: ${userId} has been successfully deleted` });
    })
    .catch((err) => {
        res.status(500).json({ message:  `Unable to delete data for likes with workout_id: ${workoutId} and user_id: ${userId}` });
    });
} 

module.exports = {
    findOne,
    getAllWorkouts,
    add,
    remove
  };