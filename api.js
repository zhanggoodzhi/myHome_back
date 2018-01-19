'user strict'
const express = require('express');
const Note = require('./note');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const superagent = require('superagent');
const cheerio = require('cheerio');

function removeDuplicate(arr1, arr2) {
    const arr1Ids = arr1.map(v => v._id.toString());
    const arr2Ids = arr2.map(v => v._id.toString());
    const correctIds = Array.from(new Set(arr1Ids.concat(arr2Ids)));
    const correctArr = [];
    const allArr = arr1.concat(arr2);
    correctIds.forEach(v => {
        for (let i = 0; i < allArr.length; i++) {
            if (allArr[i].id.toString() === v) {
                correctArr.push(allArr[i]);
                break;
            }
        }
    });
    return correctArr;
}

function getGameHorseLamp(cb) {
    superagent
        .get('http://ol.gamersky.com')
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后 就可以得到一个实现了 jquery
            // 接口的变量，我们习惯性地将它命名为 `$` 剩下就都是 jquery 的内容了
            const $ = cheerio.load(sres.text);
            const horseLamp = [];
            $('.Slide_con li').each(function (i, e) {
                const el = $(e);
                horseLamp.push({
                    imgUrl: el
                        .find('img')
                        .attr('src'),
                    href: el
                        .find('a')
                        .attr('href'),
                    text: el
                        .find('h3')
                        .text()
                });
            });
            cb(horseLamp);
        });
}

function getGameRank(cb) {
    superagent
        .get('http://top.17173.com/index-1-0-0-0-0.html')
        .end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return next(err);
            }
            // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后 就可以得到一个实现了 jquery
            // 接口的变量，我们习惯性地将它命名为 `$` 剩下就都是 jquery 的内容了
            const $ = cheerio.load(sres.text);
            const newRank = [];
            const hotRank = [];
            $('.main-c1 .list-plate li.item').each(function (i, e) {
                const el = $(e);
                newRank.push({
                    imgUrl: el
                        .find('img')
                        .attr('src'),
                    name: el
                        .find('.c2 a')
                        .text(),
                    updateTime: el
                        .find('.c5')
                        .text(),
                    infoUrl: el
                        .find('.channel a')
                        .eq(0)
                        .attr('href'),
                    officialUrl: el
                        .find('.channel a')
                        .last()
                        .attr('href')
                });
            });
            $('.main-c2 .list-plate li.item').each(function (i, e) {
                const el = $(e);
                hotRank.push({
                    imgUrl: el
                        .find('img')
                        .attr('src'),
                    name: el
                        .find('.c2 a')
                        .text(),
                    updateTime: el
                        .find('.c5')
                        .text(),
                    infoUrl: el
                        .find('.channel a')
                        .eq(0)
                        .attr('href'),
                    officialUrl: el
                        .find('.channel a')
                        .eq(3)
                        .attr('href')
                });
            });
            cb({newRank, hotRank});
        });
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
            res.json(removeDuplicate(notes, notes2));
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

// 获取游戏轮播图信息
router.get('/api/games/horseLamp', (req, res) => {
    getGameHorseLamp(function (hostLamp) {
        res.json(hostLamp);
    });
})

// 获取游戏排行信息
router.get('/api/games/rank', (req, res) => {
    getGameRank(function (rank) {
        res.json(rank);
    });
})

module.exports = router