const express = require("express");
const rp = require("request-promise");

const app = express();
const timeout = 600000;

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "App is working"
  });
});

app.post("/app", async (req, res) => {
  const { body } = req;
  let response;
  if (body.method === "POST") {
    response = await rp.post(body.url, {
      [body.type === "json" ? "body" : body.type === "urlencoded" ? "form" : "formData"]: body.body,
      headers: body.headers,
      simple: false,
      json: true,
      resolveWithFullResponse: true,
      timeout
    });
  } else if (body.method === "GET") {
    response = await rp.get(body.url, {
      headers: body.headers,
      simple: false,
      json: true,
      resolveWithFullResponse: true,
      timeout
    });
  } else if (body.method === "PATCH") {
    response = await rp.patch(body.url, {
      [body.type === "json" ? "body" : body.type === "urlencoded" ? "form" : "formData"]: body.body,
      headers: body.headers,
      simple: false,
      json: true,
      resolveWithFullResponse: true,
      timeout
    });
  } else if (body.method === "PUT") {
    response = await rp.put(body.url, {
      [body.type === "json" ? "body" : body.type === "urlencoded" ? "form" : "formData"]: body.body,
      headers: body.headers,
      simple: false,
      json: true,
      resolveWithFullResponse: true,
      timeout
    });
  } else if (body.method === "DELETE") {
    response = await rp.delete(body.url, {
      [body.type === "json" ? "body" : body.type === "urlencoded" ? "form" : "formData"]: body.body,
      headers: body.headers,
      simple: false,
      json: true,
      resolveWithFullResponse: true,
      timeout
    });
  } else if (body.method === "OPTIONS") {
    response = await rp(body.url, {
      method: "OPTIONS",
      [body.type === "json" ? "body" : body.type === "urlencoded" ? "form" : "formData"]: body.body,
      headers: body.headers,
      simple: false,
      json: true,
      resolveWithFullResponse: true,
      timeout
    });
  }
  res.status(response.statusCode).json(response.body);
});

app.listen(process.env.PORT || 4500, () => {
  console.log("Proxy server running");
});
