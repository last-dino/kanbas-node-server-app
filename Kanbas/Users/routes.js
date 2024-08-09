import * as dao from "./dao.js";

export default function UserRoutes(app) {
    const register = async (req, res) => {
        try {
            const {username} = req.body;
            const oldUser = await dao.findUserByUsername(username);
            if (oldUser) {
                res.status(400).json({ message: "Username already taken" });
                return;
            }
            const oldUser2 = await dao.findUserByEmailAddress(req.body.email);
            if (oldUser2) {
                res.status(400).json({ message: "Email already taken" });
                return;
            }


            const user = await dao.createUser(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err.message });
        }
    };


    const login = async (req, res) => {
        try {
            const {username, password} = req.body;
            const oldUser = await dao.findUserByUsername(username);
            if (!oldUser) {
                res.status(404).json({ message: "User not exist" });
                return;
            }

            if (oldUser.password !== password) {
                res.status(400).json({ message: "Password not correct" });
                return;
            }

            delete oldUser.password;
            req.session.currentUser = oldUser;
            console.log(req.session)
            res.json(oldUser);
        } catch (err) {
            console.log(err);
            res.status(400).json({ message: err.message });
        }
    };

    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    const findAllUsers = async (req, res) => {
        const { role, name } = req.query;
        if (role) {
            const users = await dao.findUsersByRole(role);
            res.json(users);
            return;
        }
        if (name) {
            const users = await dao.findUsersByPartialName(name);
            res.json(users);
            return;
        }      
        const users = await dao.findAllUsers();
        res.json(users);
    };
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user); 
    };
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        const status = await dao.updateUser(userId, req.body);
        res.json(status);
    };
    const signup = async (req, res) => {
        const user = await dao.findUserByUsername(req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already taken" });
            return;
        }
        const currentUser = await dao.createUser(req.body);
        req.session["currentUser"] = currentUser;
        res.json(currentUser);
    };
    const signin = async (req, res) => {
        const { username, password } = req.body;
        const currentUser = await dao.findUserByCredentials(username, password);
        if (currentUser) {
            req.session["currentUser"] = currentUser;
            res.json(currentUser);
        }
        else {
            res.status(401).json({ message: "Unable to login. Try again later." });
        }
    };
    const signout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };
    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        console.log(req.session);
        if (!currentUser) {
            res.sendStatus(401);
            return;
        }
        res.json(currentUser);
    };
    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/profile", profile);
}