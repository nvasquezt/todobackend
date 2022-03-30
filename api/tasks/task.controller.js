const {
    getAllTasks,
    getTaskById,
    createTask,
    deleteTask,
    patchtask
} = require('./task.service');

async function handlerAllTasks(req, res) {
    const tasks = await getAllTasks();
    res.json(tasks);
}

async function handlerTaskById(req, res) {
    const { id } = req.params;
    const task = await getTaskById(id);

    if (!task) {
        res.status(404).json({
            message: `Task with id ${id} not found`
        });
    }

    res.json(task);
}

async function handlerCreateTask (req, res) {
  const newTask = {
    ...req.body,
    userId: req.user._id,
  };
  try {
    const task = await createTask(newTask);
    res.status(201).json(task);
  }
  catch (err) {
    res.status(400).json(err);
  }
}

async function handlerDeleteTask (req,res){
    const { id } = req.params;
    const task = await deleteTask(id);
    if (!task) {
        res.status(404).json({
            message: `Task with id ${id} not found`
        });
    } else {
        res.json({action: 'deleted'});
    }
}

async function handlerUpdateTask(req, res){
    const { id } = req.params;
    const { body } = req;
    const task = await patchtask(id, body);
    if (!task) {
        res.status(404).json({
            message: `Task with id ${id} not found`
        });
    } else {
        res.json(task);
    }
}

module.exports = {
    handlerAllTasks,
    handlerTaskById,
    handlerCreateTask,
    handlerDeleteTask,
    handlerUpdateTask
};
