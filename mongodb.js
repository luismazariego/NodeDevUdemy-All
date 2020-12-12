// CRUD operations

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const connectionUrl = 'mongodb://127.0.0.1:27017'; //it is best to use ip address instead of localhost.
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName);

    db.collection('tasks').insertMany([
        {
            description: 'Do the laundry',
            completed: false
        },
        {
            description: 'Do the dishes',
            completed: false
        },
        {
            description: 'Go to work',
            completed: true
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks!');
        }

        console.log(result.ops);
    });

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
});