import express from "express";

const PORT = 4000;

const app = express();

// url middleware
const URLLogger = (req, res, next) => {
  console.log(`Path: ${req.url}`);
  next();
};

// time middleware
const date = new Date();
const year = date.getFullYear()
const month = date.getMonth()+1
const day = date.getDay()+1

const TimeLogger = (req, res, next) => {
  console.log(`Time: ${year}.${month}.${day}`);
  next();
};

// security middleware
const SecurityLogger = (req, res, next) => {
  if (req.protocol === "https") {
    console.log("secure");
  }else{
    console.log("insecure");
  }
  next();
};

// private middleware
const privateMiddleware = (req, res, next) =>{
  const url = req.url;
  if (url === "/protected" ){
    return res.send("Sorry, You are not allowed to this page")
  }
  next();
}

const handleHome = (req, res) => {
  return res.send("I still love you.");
};

const handleProtected = (req, res) => {
  return res.send("Welcome to the private lounge.")
}

app.use(URLLogger)
app.use(TimeLogger)
app.use(SecurityLogger)
app.use(privateMiddleware)

app.get("/", handleHome);
app.get("/protected", handleProtected);

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);