const router = require('express').Router();
const Todo = require('../models/todo.model');
const User = require('../models/user.model');
const { createTodoValidation } = require('./../utils/validation');
const verify = require('../middlewares/verify');

router.post('/create', verify, async (req, res) => {
    const { title, description } = req.body;
    const { _id } = req.user;
    const { error } = createTodoValidation(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            messages: error.details[0].message
        });
    }

    const todo = new Todo({
        title: title,
        description: description,
        user: _id
    });

    try {
        const savedTodo = await todo.save();
        res.send({
            success: true,
            data: savedTodo
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            messages: err
        });;
    }
})

router.get('/', verify, async (req, res) => {
    const { _id } = req.user;
    const todo = await Todo.find({ user: _id });
    res.json({
        success: true,
        data: todo
    });
})

router.put('/:id', verify, async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;

    const data = {
        title,
        description,
        status
    }

    await Todo.findByIdAndUpdate(id, data);
    res.json({
        success: true,
        data: {
            todo: {
                _id: id,
                title,
                description,
                status
            }

        }

    });

})

router.delete('/:id', verify, async (req, res) => {
    const { id } = req.params;

    const todo = await Todo.findByIdAndRemove(id);

    res.json({
        success: true,
        data: todo
    });

})

module.exports = router;
