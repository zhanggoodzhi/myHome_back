'user strict'
const express = require('express')
const Note = require('./note')
const router = express.Router()
const fs = require('fs')
const path = require('path')

function removeDuplicate(arr1, arr2) {
    const arr1Ids = arr1.map(v => v._id.toString());
    const arr2Ids = arr2.map(v => v._id.toString());
    const correctIds = Array.from(new Set(arr1Ids.concat(arr2Ids)));
    const correctArr = [];
    const allArr=arr1.concat(arr2);
    correctIds.forEach(v=>{
        for(let i=0;i<allArr.length;i++){
            if(allArr[i].id.toString()===v){
                correctArr.push(allArr[i]);
                break;
            }
        }
    });
    return correctArr;
}

// 查询所有日志
router.get('/api/getNotes', (req, res) => {
    const keyword = req.query.keyword;
    var pattern = new RegExp(keyword, 'i');
    Note.find({
        title: {
            $regex: pattern
        }
    }, {
        __v: 0
    }, (err, notes) => {
        if (err) {
            res.send(err)
            return
        }
        Note.find({
            content: {
                $regex: pattern
            }
        }, {
            __v: 0
        }, (err2, notes2) => {
            if (err2) {
                res.send(err2)
                return
            }
            res.json(removeDuplicate(notes,notes2));
        })
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