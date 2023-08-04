"use strict";
var todolist = {
    tasks: [],
    task_counter: 0
};
function create_task(content) {
    todolist.task_counter = todolist.task_counter + 1;
    let new_task = {
        task_id: todolist.task_counter,
        content,
        completed: false
    };
    todolist.tasks.push(new_task);
}
create_task("read aptos.dev");
function findIndex(array, target_id) {
    for (let i = 0; i < array.length; i++) {
        if (array[i]["task_id"] == target_id) {
            return i;
        }
    }
    return -1;
}
function complete_task(task_id) {
    let index = findIndex(todolist.tasks, task_id);
    todolist.tasks[index]["completed"] = true;
}
complete_task(1);
create_task("read apt");
console.log(todolist);
