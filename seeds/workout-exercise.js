/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// import seed data files, arrays of objects
const exerciseData = require('../seed-data/exercises');
const workoutData = require('../seed-data/workouts');

exports.seed = function (knex) {
  return knex('exercise')
    .del()
    .then(function () {
      return knex('workout').del();
    })
    .then(function () {
      return knex('workout').insert(workoutData);
    })
    .then(() => {
      return knex('exercise').insert(exerciseData);
    });
};