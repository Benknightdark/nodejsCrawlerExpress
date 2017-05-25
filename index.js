//var express = require('express')
//var cors = require('cors')
var cheerio = require("cheerio");
var dateFormat = require('dateformat');
var rp = require('request-promise');


//var app = express()
//app.use(cors())



var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())

app.get('/', function (req, res, next) {

 rp('https://netbank.jihsunbank.com.tw/Rate/ExgRate.htm')
    .then(function (htmlString) {
      var $ = cheerio.load(htmlString);
            for (var a = 0; a < $("td[class=TitleForRate]").length; a++) {
               
                if ($($("td[class=TitleForRate]")[a]).text() == "澳幣") {
                    var CurrencyType = $($("td[class=TitleForRate]")[a]).text()
                    var day = dateFormat(new Date().now, "yyyy-mm-dd h:MM:ss");
                    var time = $("em");
                    console.log("實際更新時間：",day);
                    console.log("最新更新時間：", $(time).text())                    
                    console.log("幣別：",$($("td[class=TitleForRate]")[a]).text())
                    var BuyRate = $($("td[class=TitleForRate]")[a]).next()
                    console.log("買匯：",$(BuyRate).text())
                    var SaleRate = $(BuyRate).next()
                    console.log("賣匯:",$(SaleRate).text())
                    console.log("=======================================");
                }

                
            }})

  res.json({msg:"fff"})
})

app.listen(8099, function () {
  console.log('CORS-enabled web server listening on port 80')
})

    