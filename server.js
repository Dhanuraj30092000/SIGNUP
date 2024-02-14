var orm = require("orm");
const express = require('express');
const app = express();
const port = 3006;
const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes)
// Start the server
app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
})
