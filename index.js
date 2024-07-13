const express = require("express");
const server = express();
const PORT = 4001;
const checkArrayString = (arr) => {
    let flag = true
  arr.forEach((ele) => {
    if (typeof ele !== "string") {
      flag=false;
      return;
    }
  });
  return flag;
};
const validateDataMiddleware = (req, res, next) => {
  const { ID, Name, Rating, Description, Genre, Cast } = req.body;
  //console.log(ID,Name,Rating,Description,Genre,Cast);
  let errMessage = "";
  if (typeof ID !== "number") {
    errMessage += "ID must be a number";
  }
  if (typeof Name !== "string") {
    errMessage += "Name must be a string";
  }
  if (typeof Rating !== "number") {
    errMessage += "Rating must be a number";
  }
  if (typeof Description !== "string") {
    errMessage += "Description must be a string";
  }
  if (typeof Genre !== "string") {
    errMessage += "Genre must be a string";
  }
  if (!Array.isArray(Cast) || !checkArrayString(Cast)) {
    errMessage += "Cast must be an array";
  }
  if(errMessage){
    return res.status(400).json({
        message:"bad request. some data is incorrect",
        note:errMessage
    })
  }

  next();
};
server.use(express.json());
server.post("/", validateDataMiddleware, (req, res) => {
  // console.log(data);
  res.status(200).json({ message: "data received" });
});
server.listen(PORT, (req, res) => {
  console.log(`server is running on port: ${PORT}`);
});
