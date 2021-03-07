/*
 * @Author: conjurer
 * @Github: https://github.com/dot123
 * @Date: 2021-01-09 00:09:31
 * @LastEditors: conjurer
 * @LastEditTime: 2021-01-10 18:39:05
 * @Description:
 */
const multiavatar = require("./multiavatar");
const sharp = require("sharp");
const contentDisposition = require("content-disposition");
const express = require("express");
const app = express();
const port = 3000;

//http://127.0.0.1:3000/sharp?str=1
app.get("/sharp", (req, res) => {
    let str = req.query["str"];
    const roundedCorners = Buffer.from(multiavatar.multiavatar(str));
    sharp(roundedCorners)
        .resize(300, 300)
        .toBuffer()
        .then((buff) => {
            res.setHeader("Content-Type", "image/png");
            res.set("Content-Disposition", contentDisposition(str + ".png"));
            res.end(buff);
        });
});

app.listen(port, () => console.log(`sharp app listening on port ${port}!`));
