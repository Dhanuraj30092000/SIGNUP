var orm = require("orm");
const express = require('express');
const app = express();
const port = 3006;
const bodyParser = require('body-parser')
var cors = require('cors')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

const corsOptions = { 
    origin : "*", 
 } 
app.use(cors(corsOptions))


// parse application/json
app.use(bodyParser.json())

const UserInit = require("./models/User");

const userRoutes = require("./routes/user.routes");
const dwRoutes = require("./routes/dw.router");

app.use("/api", userRoutes) 
app.use("/resources", dwRoutes) 

app.use(function(err, req, res, next) { 
    console.error(err.stack);
    res.status(500).send(`Something has gone wrong!! Our Engineers are on it. A retry might work`);
});

app.listen(port, async () => {
    console.log(`Server is listening at http://localhost:${port}`);
})


