const http = require("http");
const fs = require("fs");
const url = require("url");
const qs = require("querystring");
const app = http.createServer((req, res) => {
  const _url = url.parse(req.url);
  const pathname = _url.pathname;
  if (pathname === "/") {
    fs.readFile("./index.html", "utf8", (err, data) => {
      res.writeHead(200);
      res.end(data);
    });
  } else if (pathname === "/create") {
    fs.readFile("./create.html", "utf8", (err, data) => {
      let body = "";
      req.on("data", (data) => {
        body += data;
      });
      req.on("end", () => {
        const post = qs.parse(body);
        const name = post.name;
        console.log(name);
      });
      res.writeHead(200);
      res.end(data);
    });
  }
});

app.listen(3000, () => console.log("http://localhost:3000"));
