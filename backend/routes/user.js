const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const checkAuth = require("../middleware/checkAuth");
const app = express()
app.use(express.json());

router.post("/signup", async (req, res) => {
    console.log(req.body)
    try {
        const users = await User.find({ email: req.body.email });
        if (users.length > 0) {
            return res.status(500).json({
                error:"email already registered",
            })
        }
        const hashCode = await bcrypt.hash(req.body.password, 10);
        console.log(hashCode);

        const newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            password:hashCode
        })

        const user = await newUser.save()
        res.status(200).json({
            newUser: user,
        });
       


    } catch (err) {
        console.log("asdasdasfsdfs")
        console.log(err);
        console.log("eroooooooooorrrrrrrrrr")
        res.status(500).json({
            error:err,
        })
    }
})


router.post("/login", async (req, res) => {
    try {
        console.log(req.body)
        const users = await User.find({ email: req.body.email });
        console.log(users);
        if (users.length == 0) {
            return res.status(500).json({
                error: "email is not Registered.......",
                
            })
            
        }

        const isValid = await bcrypt.compare(req.body.password, users[0].password);
        console.log(isValid);
        if (!isValid) {
            return res.status(500).json({
                error: "invalid password",
            });

        }

        const token = jwt.sign(
            {
                _id: users[0]._id,
                name: users[0].name,
                email: users[0].email
            }, "basil", {
            expiresIn: "365d",
        }
        );
        res.status(200).json({
            _id: users[0]._id,
            name: users[0].name,
            email: users[0].email,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "something is wrong",
        })
    }
});

router



module.exports = router