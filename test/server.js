const express = require("express");
const app = express();
const path = require("path");
const port = 30001;

//then loads in the index file
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.static(path.join(__dirname, "e2e/core")));
app.use(express.static(path.join(__dirname, "e2e/unit")));
app.use(express.static(path.join(__dirname, "e2e/data")));
app.use(express.static(path.join(__dirname, "e2e/geojson")));
app.use(express.static(path.join(__dirname, "e2e/layers")));
app.use(express.static(path.join(__dirname, "e2e/mapml-viewer")));
app.use(express.static(path.join(__dirname, "e2e/web-map")));

app.get('/data/query/us_map_query', (req, res, next) => {
  res.sendFile(__dirname + "/e2e/data/tiles/cbmt/us_map_query.mapml", { headers: { "Content-Type": "text/mapml" } }, (err) => {
    if (err) {
      res.status(403).send("Error.");
    }
  });
});
app.get('/data/query/html_query_response', (req, res, next) => {
  res.sendFile(__dirname + "/e2e/data/tiles/cbmt/html_query_response.html", { headers: { "Content-Type": "text/html" } }, (err) => {
    if (err) {
      res.status(403).send("Error.");
    }
  });
});
app.get('/data/query/DouglasFir', (req, res, next) => {
  res.sendFile(__dirname + "/e2e/data/tiles/cbmt/DouglasFir.mapml", { headers: { "Content-Type": "text/mapml" } }, (err) => {
    if (err) {
      res.status(403).send("Error.");
    }
  });
});

app.use("/data", express.static(path.join(__dirname, "e2e/data/tiles/cbmt")));
app.use("/data", express.static(path.join(__dirname, "e2e/data/tiles/wgs84")));
app.use("/data", express.static(path.join(__dirname, "e2e/data/tiles/osmtile")));
app.use(
  "/data/cbmt/0",
  express.static(path.join(__dirname, "e2e/data/tiles/cbmt/0"))
);
app.use(
  "/data/cbmt/2",
  express.static(path.join(__dirname, "e2e/data/tiles/cbmt/2"))
);
app.use(
  "/data/cbmt/3",
  express.static(path.join(__dirname, "e2e/data/tiles/cbmt/3"))
);
app.use(
  "/data/wgs84/0",
  express.static(path.join(__dirname, "e2e/data/tiles/wgs84/0"))
);
app.use(
  "/data/wgs84/1",
  express.static(path.join(__dirname, "e2e/data/tiles/wgs84/1"))
);
app.use(
    "/data/osmtile/2",
    express.static(path.join(__dirname, "e2e/data/tiles/osmtile/2"))
);

console.log("Running on localhost:" + port);

app.listen(port);