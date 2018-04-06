var handlebars = require('handlebars'),
  fs = require('fs');

var data = JSON.parse(fs.readFileSync('newsletter_data/20180406_000/data.json', 'utf8'));
data.body = process.argv[2];

fs.readFile('template.html', 'utf-8', function(error, source){
  handlebars.registerHelper('custom_title', function(title){
    var words = title.split(' ');
    for (var i = 0; i < words.length; i++) {
      if (words[i].length > 4) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
    }
    title = words.join(' ');
    return title;
  })

  var template = handlebars.compile(source);
  var html = template(data);
  console.log(html)
});
