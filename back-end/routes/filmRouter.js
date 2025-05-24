const express = require('express');
const db = require('../db');

const filmRouter = express.Router();

//get film_list of a user
filmRouter.get('/:user_id', async (req, res, next) => {
    const { user_id } = req.params;

    try {
        const result = await db.query('SELECT * FROM film_list WHERE user_id = $1', [user_id]);
        return res.status(200).json({result: result.rows});
    } catch(err) {
        return res.status(500).json({error: err.message});
    }
});

//get a film from a filmList with user_id and film_id
filmRouter.get('/', async (req, res, next) => {
    const { user_id, film_id } = req.query;

    try {
        const result = await db.query('SELECT * FROM film_list WHERE user_id = $1 AND film_id = $2', [user_id, film_id]);

        if(result.rowCount === 0) {
            return res.status(404).json({result: result.rows});
        }
        return res.status(200).json({result: result.rows});
    } catch(err) {
        return res.status(500).json({error: err});
    }
});

//add a new film to film_list and return the new list of a user
filmRouter.post('/', async (req, res, next) => {
    const { user_id, film_id } = req.body;

    try {
        const result = await db.query('INSERT INTO film_list (user_id, film_id) VALUES ($1, $2)', [user_id, film_id]);
        if (result.rowCount === 0) {
            throw new Error('Failed to insert into film_list');
        }
        const newList = await db.query('SELECT * FROM film_list WHERE user_id = $1', [user_id]);
        return res.status(201).json({result: newList.rows});
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

//Update the watched status of a film in the film_list of a user
filmRouter.put('/', async (req, res, next) => {
    const { user_id, film_id, watched } = req.body;

    try {
        const result = await db.query('UPDATE film_list SET watched = $1 WHERE user_id = $2 AND film_id = $3', [watched, user_id, film_id]);

        if (result.rowCount === 0) {
            throw new Error('Failed to update film_list');
        }

        const newList = await db.query('SELECT * FROM film_list WHERE user_id = $1', [user_id]);
        return res.status(200).json({result: newList.rows});
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

//delete a film from film_list and return new list of a user
filmRouter.delete('/', async (req, res, next) => {
    const { user_id, film_id } = req.body;

    try {
        const result = await db.query('DELETE FROM film_list WHERE user_id = $1 AND film_id = $2', [user_id, film_id]);
        if (result.rowCount === 0) {
            throw new Error('Failed to delete');
        }
        const newList = await db.query('SELECT * FROM film_list WHERE user_id = $1', [user_id]);
        return res.status(200).json({result: newList.rows});
    } catch(err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = filmRouter;