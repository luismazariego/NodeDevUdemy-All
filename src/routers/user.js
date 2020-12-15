const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }

    //#region Promise chaining
    // user.save().then(() => {
    //     res.status(201).send(user);
    // }).catch((err) => {
    //     res.status(400).send(err);
    // })
    //console.log(req.body);
    //res.send('testing');
    //#endregion
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (e) {
        res.status(500).send();
    }

    //#region Promise chaining
    // User.find({}).then((users) => {
    //     res.send(users);
    // }).catch((error) => {
    //     res.status(500).send();
    // });
    //#endregion
});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;

    //needed to validate correctly formed Guid
    if(!_id.match(/[0-9a-fA-F]{24}$/)){
        return res.status(400).send();
    }

    try {
        const user = await User.findById(_id);
        if (!user) {
            return res.status(404).send();
        }
        res.send(user);
    } catch (e) {
        return res.status(500).send();
    }

    //#region Promise Chaining
    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send();
    //     }

    //     res.send(user);

    // }).catch((e) => {
    //     return res.status(500).send();
    // });
    //console.log(req.params);
    //#endregion
});

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        if (!req.params.id.match(/[0-9a-fA-F]{24}$/)) {
            return res.status(400).send();
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;

    if (!_id.match(/[0-9a-fA-F]{24}$/)) {
        return res.status(400).send();
    }

    try {
        const user = await User.findByIdAndDelete(_id);
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;