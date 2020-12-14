const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    })
    //console.log(req.body);
    //res.send('testing');
});

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch((error) => {
        res.status(500).send();
    });
})

app.get('/users/:id', (req, res) => {
    const _id = req.params.id;

    if(!_id.match(/[0-9a-fA-F]{24}$/)){
        return res.status(400).send();
    }

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);

    }).catch((e) => {
        return res.status(500).send();
    });
    //console.log(req.params);
});

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((err) => {
        res.status(400).send(err);
    })
    //console.log(req.body);
    //res.send('testing');
});

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((error) => {
        res.status(500).send();
    });
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;

    if(!_id.match(/[0-9a-fA-F]{24}$/)){
        return res.status(400).send();
    }

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);

    }).catch((e) => {
        return res.status(500).send();
    });
    //console.log(req.params);
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});

