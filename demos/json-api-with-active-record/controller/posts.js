'use strict'

const { response } = require('express')
const express = require('express')
const router = express.Router()

const db = require('../db')
const Post = require('../models/post.js')

// Example route for the callback based findById function.
// For completeness a try..catch block should be implemented.
// 
// router.get('/post/:id', async (req, res) => {
//     Post.findById(req.params.id, (obj) => {
//         obj
//             ? res.json(obj)
//             : res.sendStatus(404)
//     })
// })

router.get('/post/:id', async (req, res) => {
    try {
        let obj = await Post.findById(req.params.id)
        obj
            ? res.json(obj)
            : res.sendStatus(404)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

router.post('/post', async (req, res) => {
    // NOTE: Think of using express-jsonschema for validation
    if (!req.body.title || !req.body.text) {
        res.sendStatus(400)
        return
    }

    const p = new Post(req.body.title, req.body.text)
    
    try {
        const ret = await p.insert()
        res.set('Location', `${req.originalUrl}/${p.id}`)
        res.status(201).send(ret);
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

module.exports = router
