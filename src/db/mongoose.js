const mongoose = require('mongoose');
const validator = require('validator');

//params: connection string, options. 
// Connection string: url/databaseName
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Invalid password, (you should not use the word "password" to create a password).');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    }
});

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

//#region Examples 
// const task = new Task({
//     description: 'Finish Node course',    
// });

// task.save().then(() => {
//    console.log(task); 
// }).catch((err) => {
//     console.error('Error! ',err);
// });

// const me = new User({
//     name: 'Toffy',
//     email: 'tmazariego@threshinc.com',
//     password: 'ToffBaby',
//     age: 22
// });

// me.save().then(() => {
//     console.log(me);
// }).catch((err) => {
//     console.log('Error! ', err);
// });
//#endregion