const express = require('express')
const Note = require('./note')
const router = express.Router()
const fs = require('fs')
const path = require('path')

// 查询所有日志
router.get('/api/getNotes', (req, res) => {
    Note.find({}, {
        __v: 0
    }, (err, notes) => {
        if (err) {
            res.send(err)
            return
        }
        res.json(notes)
    })
})

// 新增日志
router.post('/api/addNote', (req, res) => {
    console.log('从前端得到的数据：', req.body)
    new Note(req.body).save((err) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json({message: '新增日志成功'})
    })
})

// 更新日志
router.post('/api/updateNote', (req, res) => {
    console.log('从前端得到的数据：', req.body);
    const others = {};
    Object
        .keys(req.body)
        .map((v) => {
            if (v !== 'id') {
                others[v] = req.body[v];
            }
        });
    Note.findByIdAndUpdate(req.body.id, others, (err) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json({message: '更新日志成功'})
    })
})

// 删除日志
router.post('/api/deleteNote', (req, res) => {
    console.log('从前端得到的数据：', req.body);
    Note.remove({
        _id: req.body.id
    }, (err) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json({message: '删除日志成功'})
    })
})

module.exports = router