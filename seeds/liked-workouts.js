/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = function (knex) {
    return knex('likedworkouts').del();
};