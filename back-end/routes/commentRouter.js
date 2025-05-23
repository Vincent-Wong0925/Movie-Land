const express = require('express');
const db = require('../db');

const commentRouter = express.Router();

//get all comments of a film
commentRouter.get('/:film_id', async (req, res, next) => {
    const { film_id } = req.params;

    try {
        const result = await db.query('SELECT comments.user_id, comments.film_id, comments.score, comments.comment, users.username FROM comments, users WHERE comments.film_id = $1 AND users.id = comments.user_id', [film_id]);
        return res.status(200).json({ result: result.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//get a specific comment using user_id and film_id
commentRouter.get('/', async (req, res, next) => {
    const { user_id, film_id } = req.query;
    if (!user_id || !film_id) {
        return res.status(422).json({ error: 'missing query string' });
    }

    try {
        const result = await db.query('SELECT comments.user_id, comments.film_id, comments.score, comments.comment, users.username FROM comments, users WHERE comments.user_id = $1 AND comments.film_id = $2 AND users.id = comments.user_id', [user_id, film_id]);
        return res.status(200).json({ result: result });
    } catch(err) {
        res.status(500).json({ error: err });
    }
});

//add a comment to a film
commentRouter.post('/', async (req, res, next) => {
    const { user_id, film_id, score, comment } = req.body;

    try {
        const result = await db.query('INSERT INTO comments (user_id, film_id, score, comment) VALUES ($1, $2, $3, $4)', [user_id, film_id, score, comment]);

        if (result.rowCount === 0) {
            throw new Error('Failed to insert into comments');
        }

        const newList = await db.query('SELECT comments.user_id, comments.film_id, comments.score, comments.comment, users.username FROM comments, users WHERE comments.film_id = $1 AND users.id = comments.user_id', [film_id]);

        return res.status(201).json({ result: newList.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//update the score and comment of a film
commentRouter.put('/', async (req, res, next) => {
    const { user_id, film_id, score, comment } = req.body;

    try {
        const result = await db.query('UPDATE comments SET score = $1, comment = $2 WHERE user_id = $3 AND film_id = $4', [score, comment, user_id, film_id]);

        if (result.rowCount === 0) {
            throw new Error('Failed to update comment');
        }

        const newList = await db.query('SELECT comments.user_id, comments.film_id, comments.score, comments.comment, users.username FROM comments, users WHERE comments.film_id = $1 AND users.id = comments.user_id', [film_id]);

        return res.status(200).json({ result: newList.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//delete a comment of a film
commentRouter.delete('/', async (req, res, next) => {
    const { user_id, film_id } = req.body;

    try {
        const result = await db.query('DELETE FROM comments WHERE user_id = $1 AND film_id = $2', [user_id, film_id]);

        if (result.rowCount === 0) {
            throw new Error('Failed to delete from comments');
        }

        const newList = await db.query('SELECT comments.user_id, comments.film_id, comments.score, comments.comment, users.username FROM comments, users WHERE comments.film_id = $1 AND users.id = comments.user_id', [film_id]);

        return res.status(200).json({ result: newList.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = commentRouter;