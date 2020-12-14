require('../src/db/mongoose');
const User = require('../src/models/user');


User.findByIdAndUpdate('5fd7bb4da31afb204015acd2', { age: 10 }).then((user) => {
    console.log(user);
    return User.countDocuments({
        age: 10
    }).then((result) => {
        console.log(result);
    }).catch((e) => {
        console.log(e);
    });
});