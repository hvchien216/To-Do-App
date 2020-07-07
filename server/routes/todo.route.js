const router = require('express').Router();
const Todo = require('../models/todo.model');
const User = require('../models/user.model');
const { createTodoValidation } = require('./../utils/validation');
const verify = require('../middlewares/verify');

router.post('/create', verify, async (req, res) => {
    const { title, description, userId } = req.body;
    const { error } = createTodoValidation(req.body);

    if (error) {
        return res.status(400).send({
            success: false,
            messages: error.details[0].message
        });
    }

    const todo = new Todo({
        title: title,
        description: description,
        user: userId
    });

    try {
        const savedTodo = await todo.save();
        res.send({
            success: true,
            data: savedTodo
        });
    } catch (err) {
        res.status(400).send({ messages: err });
    }
})

router.get('/:id', verify, async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.find({ user: id });
    res.send({ todo });
})

module.exports = router;
