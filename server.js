var orm = require("orm");
const express = require('express');
const app = express();
const port = 3006;
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())

const UserInit = require("./models/User");
const { register } = require("./controllers/user.controller");

const userRoutes = require("./routes/user.routes");
app.use("/api", userRoutes) 

app.listen(port, async () => {
    console.log(`Server is listening at http://localhost:${port}`);
})


