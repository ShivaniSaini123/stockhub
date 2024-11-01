const httpStatus = require("http-status");
const { User } = require("../model/user.model.js");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const login = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password || username.trim() === '' || password.trim() === '') {
        return res.status(400).json({ message: "Please Provide both username and password." })
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({ message: "User Not Found" });
        }


        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            const token = crypto.randomBytes(20).toString("hex");

            user.token = token;
            await user.save();
            // return res.status(httpStatus.OK).json({ token: token, user: { id: user._id, username: user.username } });
            return res.status(200).json({ token: token, user: { id: user._id, username: user.username } });
        } else {
            // return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Username or password" });
            return res.status(401).json({ message: "Invalid Username or password" });
        }

    } catch (e) {
        console.error("Login error:", e);
        return res.status(500).json({ message: `Something went wrong ${e.message}` });
    }
};

const register = async (req, res) => {
    const { name, username, password } = req.body;


    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(httpStatus.FOUND).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            username: username,
            password: hashedPassword
        });

        await newUser.save();

        res.status(httpStatus.CREATED).json({ message: "User Registered" });

    } catch (e) {
        res.status(500).json({ message: `Something went wrong ${e.message}` })
    }

};




module.exports = { login, register };




