'use strict';
var express = require('express');
var http = require('http')
var fs = require('fs');
var app = express();

function download(link) {

  var request = http.get(link, function(res){
    const statusCode = res.statusCode;
      if (statusCode !== 200) {
        var error = new Error(`Request Failed.\n` +
                          `Status Code: ${statusCode}`);
      } else if (!/^image\/jpeg/.test()) {
        var error = new Error(`Invalid content-type.\n` +
                          `Expected image/jpeg but received ${res.contentType}`);
      }
      if (error) {
        console.log(error.message);
        // consume response data to free up memory
        res.resume();
        //return;
      }

      var imagedata = ''
      res.setEncoding('binary')

      res.on('data', function(chunk){
          imagedata += chunk
      })

      res.on('end', function(){
          fs.writeFile('./list.jpg', imagedata, 'binary', function(err){
              if (err) throw err
              console.log('File saved.')
          })
      })

  })
}

app.get('/', function (req, res) {
  download('http://strabo.com/gallery/albums/wallpaper/foo_wallpaper.sized.jpg');
  res.send('image ok!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
