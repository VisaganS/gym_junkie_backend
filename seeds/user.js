/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// import seed data files, arrays of objects
const usersData = require('../seed-data/users');

exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert(usersData);
    });
};