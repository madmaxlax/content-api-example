// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const pdf = require("pdf-creator-node");

var options = {
  format: "Letter",
  orientation: "portrait",
  border: "10mm",
  header: {
    height: "45mm",
    contents: '<div style="text-align: center;">Content: Delivered.</div>'
  },
  footer: {
    height: "28mm",
    contents: {
      default:
        '<span style="color: #444;">Page {{page}}</span>/<span>{{pages}}</span>' // fallback value
    }
  }
};

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/views/index.html");
});

// Request Handler
app.post("/getDownloadLink", async (req, res) => {
  // get request input
  const { contentText } = req.body.input;

  // run some business logic

  /*
  // In case of errors:
  return res.status(400).json({
    message: "error happened"
  })
  */

  // success
  return res.json({
    name: "<value>",
    downloadLink: "<value>"
  });
});

app.get("/downloadLink", async (req, res) => {
  // get request input
  const contentText = req.query.text;

  // run some business logic

  /*
  // In case of errors:
  return res.status(400).json({
    message: "error happened"
  })
  */
  var filepath = "./contentresult.pdf";
  var document = {
    html: `<h1>
  Content API
    </h1>
    <br/>
    <br/>
    <h3>
      Your content text here:
    </h3>
    <h4>
      {{contentText}}
    </h4>`,
    data: {
      contentText: contentText
    },
    path: filepath,
    type: ""
  };
  console.log('creating PDF');
  // pdf
  //   .create(document, options)
  //   .then(file => {
  //     console.log("file created!", file);
  //     res.download(filepath);
  //   })
  //   .catch(error => {
  //     console.error("pdf creation error", error);
  //   });
  res.download("./ContentFile.pdf")
  // res.redirect("https://cdn.glitch.com/3dd8ae9e-8a94-45e4-98a6-e0218f764058%2FContentFile.pdf?v=1615562486662")
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
