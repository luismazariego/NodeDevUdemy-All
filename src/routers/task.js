const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
    //#region Promise chaining
    // task.save().then(() => {
    //     res.status(201).send(task);
    // }).catch((err) => {
    //     res.status(400).send(err);
    // })
    //#endregion
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
    //#region Promise chaining
    // Task.find({}).then((tasks) => {
    //     res.send(tasks);
    // }).catch((error) => {
    //     res.status(500).send();
    // });
    //#endregion
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    if(!_id.match(/[0-9a-fA-F]{24}$/)){
        return res.status(400).send();
    }
    
    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (e) {
        res.status(500).send(e);
    }
    //#region Promise chaining
    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send();
    //     }

    //     res.send(task);

    // }).catch((e) => {
    //     return res.status(500).send();
    // });
    //#endregion
});

router.patch('/tasks/:id', async (req, res) => {
    if (!req.params.id.match(/[0-9a-fA-F]{24}$/)) {
        return res.status(400).send();
    }
    
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    if (!_id.match(/[0-9a-fA-F]{24}$/)) {
        return res.status(400).send();
    }

    try {
        const task = await Task.findByIdAndDelete(_id);
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;