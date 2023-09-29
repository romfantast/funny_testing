const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const data = require("./data");
var path = require("path");

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const formDataFolder = path.join(__dirname, "..");
    callback(null, formDataFolder + "/client/public");
  },
  filename: function (req, file, callback) {
    const filename = Date.now() + "-" + file.originalname;
    callback(null, filename);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10000000,
  },
});

app.post("/upload", upload.any(), (req, res) => {
  const data = req.body;
  const picture = req.files[0];
  res.status(200).json({
    message: "Successful upload",
    filename: picture.filename,
    person: data,
  });
});

app.get("/search", (req, res) => {
  const searchValue = req.query.search.toLowerCase();
  const filteredData = data.products.filter(
    (item) =>
      item.title.toLowerCase().includes(searchValue) ||
      item.description.toLowerCase().includes(searchValue) ||
      item.brand.toLowerCase().includes(searchValue) ||
      item.category.toLowerCase().includes(searchValue)
  );
  res.status(200).json({ ...data, products: filteredData });
});

app.listen(3000, () =>
  console.log("FormData app is listening on http://localhost:3000")
);
