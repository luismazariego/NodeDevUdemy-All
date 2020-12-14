const mongoose = require('mongoose');


//params: connection string, options. 
// Connection string: url/databaseName
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
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