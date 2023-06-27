const router = require("express").Router();
const knex = require("knex")(require(('../knexfile')));
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

/**
 * 
 * TO DO:
 * 1. POST /login to login
 * 2. GET /profile for private data
 * 3. POST /signup to register
 * 
 *  */

router.post("/login", (req, res) => {
  // get data from req, (email, password)
  const { email, password } = req.body;
  if(!email || !password) {
    return res.status(400).json("Please enter all fields");
  }

  // compare it against database
  // // CHECK IF USER EXISTS
  knex("users")
    .where({email: email})
    .then(data => {
      if(!data.length) {
        return res.status(400).json("No such user")
      }
  // // IF USER EXISTS, SEE IF PASSWORD MATCHES
      // if(data[0].password!==password) {
      if(!bcrypt.compareSync(password, data[0].password)) {
        return res.status(400).json("Incorrect password")
      }
      const user = {...data[0]};
  // generate and send a JWT
    delete user.password;
    // delete data[0].phone;
    const token = jwt.sign(user, 'tOpS3CretKeY?!');
    res.status(200).json(token);
  })
})



router.get("/profile", (req, res) => {
  // verify jwt (req.headers.authorization) split it to create
  // // ["bearer",jwt];
  if(!req.headers.authorization) {
    return res.status(401).json("PLEASE LOGIN")
  }
  
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, 'tOpS3CretKeY?!');
    return res.status(200).json(decoded)
  } catch(error) {
    return res.status(401).json("invalid auth token");
  }
}) 



router.post("/signup", (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if(!first_name || !last_name || !email || !password) {
    return res.status(400).json("Please enter all fields");
  }
  const hashedPassword = bcrypt.hashSync(password);
  const newUser = {
    first_name, 
    last_name, 
    email, 
    password: hashedPassword
  }
  knex("users")
    .insert(newUser)
    .then(data => res.status(200).json("registered successfully!"))
    .catch(err => res.status(500).json("something went wrong!"));

});





module.exports = router;