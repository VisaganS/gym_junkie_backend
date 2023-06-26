const knex = require("knex")(require("../knexfile"));
const validator = require("validator");

const getAll = (_req, res) => {
  knex("exercise")
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => res.status(400).send(`Error retrieving Data: ${err}`));
};

const findOne = (req, res) => {
  knex("exercise")
    .where({ id: req.params.id  })
    .then((itemFound) => {
      if (itemFound.length === 0) {
        return res
          .status(404)
          .json({ message: `Exercise with ID: ${req.params.id} not found` });
      }

      const itemData = itemFound[0];

      res.status(200).json(itemData);
    })
    .catch(() => {
      res.status(500).json({
        message: `Unable to retrieve exercise data for item with ID: ${req.params.id}`,
      });
    });
};

const add = (req, res) => {
  if (
    !req.body.name||
    !req.body.muscle ||
    !req.body.equipment ||
    !req.body.difficulty ||
    !req.body.instructions ||
    !req.body.workout_id
  ) {
    return res
      .status(400)
      .send({ message: "Please fill out all required fields and try again" });
  }

  knex("workout")
    .where({ id: req.body.workout_id })
    .first()
    .then((response) => {
      if (!response) {
        return res.status(400).json({
          message:
            "The workout with the provided id does not exist. Please try again.",
        });
      }
      return knex("exercise")
        .insert(req.body)
        .then(() => {
          return res
            .status(201)
            .json({ message: "Successfully added exercise item" });
        });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "An error occurred while adding the exercise item" });
    });
};

const edit = (req, res) => {
  if (!req.body.id) {
    return res.status(400).json({
      message: `No information found for id, please enter this information and try again `,
    });
  } else if (!req.body.name) {
    return res.status(400).json({
      message: `No information found for exercise name, please enter this information and try again `,
    });
  } else if (!req.body.muscle) {
    return res.status(400).json({
      message: `No information found for muscle, please enter this information and try again `,
    });
  } else if (!req.body.equipment) {
    return res.status(400).json({
      message: `No information found for equipment, please enter this information and try again `,
    });
  } else if (!req.body.difficulty) {
    return res.status(400).json({
      message: `No information found for difficulty, please enter this information and try again `,
    });
  } else if (!req.body.workout_id) {
    return res.status(400).json({
      message: `No information found for instructions, please enter this information and try again `,
    });
  }

  knex("workout")
    .where({ id: req.body.workout_id })
    .first()
    .then((response) => {
      if (!response) {
        return res.status(400).json({
          message: `The warehouse with the id ${req.body.workout_id} does not exist. Please try again.`,
        });
      }
      knex("exercise")
        .where({ id: req.params.id })
        .then((response) => {
          if (response.length === 0) {
            return res.status(404).json({
              message: `Cannot find exercise with id ${req.params.id}`,
            });
          }
          return knex("exercise")
            .where({ id: req.params.id })
            .update(req.body)
            .then(() => {
              res.status(200).json("Updated exercise");
            });
        });
    })
    .catch((error) => {
      return res
        .status(500)
        .json({ message: "An error occurred while adding the exercise" });
    });
};

const remove = (req, res) => {
  knex("exercise")
    .where({ id: req.params.id })
    .del()
    .then((result) => {
      if (result === 0) {
        return res.status(404).json({
          message: `Exercise item with ID: ${req.params.id} to be deleted not found`,
        });
      }
      res.sendStatus(204);
    })
    .catch(() => {
      res.status(500).json({ message: "Unable to delete exercise." });
    });
};

module.exports = {
  add,
  edit,
  findOne,
  getAll,
  remove,
};
