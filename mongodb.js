// CRUD operations

const { MongoClient, ObjectID } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017'; //it is best to use ip address instead of localhost.
const databaseName = 'task-manager';

const id = new ObjectID();
// console.log(id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    db.collection('tasks').deleteOne({
        description: 'Go to work'
    }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err)
    });

    // db.collection('users').deleteMany({
    //     age: 31
    // }).then((res) => {
    //     console.log(res)
    // }).catch((err) => {
    //     console.log(err)
    // })

    //#region Examples
    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((res) => {
    //     console.log(res);
    // }).catch((err) => {
    //     console.log(err);
    // });
    // db.collection('users').updateOne({
    //     _id: new ObjectID("5fd77eb5bcb61b19125f6591")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((res) => {
    //     console.log(res);
    // }).catch((error) => {
    //     console.log(error);
    // });
    // db.collection('tasks').findOne({ _id: new ObjectID("5fd7623a73a0c52d9c66723c") }, (err, tasks) => {
    //     if (err) {
    //         console.log('Unable to fetch');
    //     }

    //     console.log(tasks);
    // })

    // db.collection('tasks').find({ completed: false }).toArray((err, tasks) => {
    //     if (err) {
    //         console.log('Unable to fetch');
    //     }

    //     console.log(tasks);
    // });

    // db.collection('users').findOne({ _id: new ObjectID("5fd762211d9bef1254d0b8c6") }, (error, user) => {
    //     if (error) {
    //         return console.log('Unable to fetch');
    //     }

    //     console.log(user);
    // });

    // db.collection('users').find({ age: 30 }).toArray((error, users) => {
    //     console.log(users);
    // });

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Do the laundry',
    //         completed: false
    //     },
    //     {
    //         description: 'Do the dishes',
    //         completed: false
    //     },
    //     {
    //         description: 'Go to work',
    //         completed: true
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert tasks!');
    //     }

    //     console.log(result.ops);
    // });

    // db.collection('users').insertOne({
    //     name: 'Luis',
    //     age: 30
    // }, (error, result) => {
    //         if (error) {
    //             return console.log('Unable to insert user into database!');
    //         }

    //         console.log(result.ops)
    // });

    // db.collection('users').insertMany([
    //     {
    //         name: 'Jen',
    //         age: 29
    //     }, {
    //         name: 'Mary',
    //         age: 33
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user documents!')
    //     }

    //     console.log(result.ops);
    // });
    //#endregion
});