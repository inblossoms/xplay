const express = require("express");
const complie = require("./complie");

const app = express();

// 设置允许跨域访问的源
app
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173"); // 替换为允许访问的源
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
  })
  .use(express.json());

// 处理预检请求
app.options("*", (req, res) => {
  res.sendStatus(200);
});

// 其他路由处理
app.post("/compile", (req, res) => {
  const { fileName, fileJSON } = req.body;

  try {
    complie(fileName, fileJSON);
  } catch (err) {
    res.status(400).json({
      mssage: err,
    });
  }

  res.status(200).json({
    mssage: "OK",
  });
});

app.listen(3300, () => {
  console.log("Server is running on port 3300.");
});
