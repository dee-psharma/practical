const express = require("express");
const app = express();

const PORT = 3000;
app.use(express.json());


const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

app.use(logger);


const auth = (req, res, next) => {
    const { username, password } = req.headers;

    if (username === "admin" && password === "1234") {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};


app.get("/", (req, res) => {
    res.send("Server Running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
