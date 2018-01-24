const superagent = require('superagent');
const cheerio = require('cheerio');
module.exports = function (router) {
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
}