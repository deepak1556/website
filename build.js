var superagent = require('superagent');
var _ = require('underscore');
var fs = require('fs');
var http = require('http');

superagent.get('https://s3.amazonaws.com/cdnjs-artifacts//packages.json?' + new Date().getTime(), function(res, textStatus, xhr){
  var packages = res.body.packages;
  var indexTemplate = fs.readFileSync('index.template', 'utf8');
  var indexPage = _.template(indexTemplate, {packages: packages});
  fs.writeFileSync('index.html', indexPage, 'utf8');
  fs.writeFileSync('packages.json', JSON.stringify(res.body, null, 4), 'utf8');
});


var file = fs.createWriteStream("rss");
var request = http.get("http://s3.amazonaws.com/cdnjs-artifacts//rss", function(response) {
  response.pipe(file);
});








