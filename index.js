const express = require("express");
const app = express();

const PORT = 3000;

app.use(express.json());

let users = [];
app.get("/", (req, res) => {
    res.send("Server Running");
});


app.get("/users", (req, res) => res.json(users));

app.post("/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email){}{
        return res.json({ message: "Name and email required" });
    }    

    if (users.find(u => u.email === email)){
        return res.json({ message: "Email already exists" });
    }

    const user = { id: users.length + 1, name, email };
    users.push(user);

    res.json(user);
});

app.delete("/users/:id", (req, res) => {
    const i = users.findIndex(u => u.id == req.params.id);

    if (i == -1){
        return res.json({ message: "User not found" });
    }
        
    users.splice(i, 1);
    res.json({ message: "User deleted" });
});

app.listen(PORT, () => {
    console.log("Server running on port 3000");
});

app.use((req, res, next) => {
    const currentTime = new Date().toLocaleString();
    console.log(`Request received at: ${currentTime}`);
    console.log(`${req.method} ${req.url}`);
    next();
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (email === "admin@gmail.com" && password === "1234")
        return res.send("Login Success");

    res.send("Invalid Credentials");
});

const response = (message) => ({
    message,
    time: new Date().toLocaleString()
});
