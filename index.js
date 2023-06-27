const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cors());
app.use('/images', express.static('./public/images'));

const workoutsRoutes = require('./routes/workout-routes');
const exercisesRoutes = require('./routes/exercise-routes');

app.use('/workouts', workoutsRoutes);

app.use('/exercises', exercisesRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});

