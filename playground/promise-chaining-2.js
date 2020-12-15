require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5fd8a2af14dbabe0398fef18').then((task) => {
//     console.log(taks);
//     return Task.countDocuments({
//         completed: false
//     });
// }).then((result) => {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// });

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });
    return count;
}

deleteTaskAndCount('5fd78b65e350b42ce4c5b661').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});
