const bcrypt = require('bcrypt');
const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {

    let params = req.body;
    if (!params.name || !params.lastName || !params.username || !params.password || !params.email) {
        return res.json({
            error: true,
            msg: "You must complete all inputs"
        });
    }

    params.name = params.name.toLowerCase();
    params.lastName = params.lastName.toLowerCase();
    params.email = params.email.toLowerCase();

    try {
        const existUser = await UserModel.find({
            $or: [
                { username: params.username },
                { email: params.email }
            ]
        }).exec();

        if (existUser && existUser.length >= 1) {
            return res.json({
                error: true,
                msg: 'User already exists'
            });
        }

        const encryptPass = await bcrypt.hash(params.password, 10);
        params.password = encryptPass;

        try {
            const newUser = new UserModel(params);
            newUser.save();
            return res.json({
                error: null,
                msg: 'User saved successfully',
                newUser
            });
        } catch (error) {
            return res.json({
                error: true,
                msg: 'Error saving user'
            })
        }

    } catch (error) {
        return res.json({
            msg: 'Error while saving user',
            error
        });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try {
        const userLogged = await UserModel.findOne({ username });
        if (!userLogged) {
            return res.status(404).json({ msg: "Please verify some is wrong" });
        }

        const isMatch = await bcrypt.compare(password, userLogged.password);

        if (!isMatch) {
            return res.status(401).json({ msg: 'User or password are incorrect' });
        }

        const token = jwt.sign(
            { id: userLogged._id, username: userLogged.username, name: userLogged.name, lastName: userLogged.lastName, profile: userLogged.profile },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const { password: _, email, ...safeUser } = userLogged.toObject();

        res.status(200).json({ status: 200, msg: "Login success", user: safeUser, token });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const dashboard = async (req, res) => {
    res.json({ msg: 'success', user: req.user });
}



module.exports = {
    login,
    register,
    dashboard
};