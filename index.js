const express = require('express');
const app = express();
const cors = require('cors');
require("dotenv").config();
const PORT = 8080 || 5050;

app.use(express.json());
app.use(cors());

app.use('/images', express.static('./public/images'));
const userRoutes = require("./routes/user-routes");
const workoutsRoutes = require('./routes/workout-routes');
const exercisesRoutes = require('./routes/exercise-routes');
const likesRoutes = require('./routes/likedworkouts-routes');

app.use("/user", userRoutes);
app.use('/workouts', workoutsRoutes);
app.use('/exercises', exercisesRoutes);
app.use('/likes', likesRoutes);

app.listen(PORT, () => {
  console.log(`running at localhost:${PORT}`);
});

