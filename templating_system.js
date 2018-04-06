
console.log("<- Apertus Newsletter Template Renderer v0.01 ->");
console.log("Rendering for "+process.argv[2]);

var handlebars = require('handlebars'),
    fs = require('fs'),
    path = require('path');

var date = process.argv[2];
var data = JSON.parse(fs.readFileSync('newsletter_data/'+date+'/data.json', 'utf8'));

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
    var op = "rendered_output/"+date+"/newsletter.html";
    function ensureDirectoryExistence(filePath) {
        var dirname = path.dirname(filePath);
        if (fs.existsSync(dirname)) {
            return true;
        }
        ensureDirectoryExistence(dirname);
        fs.mkdirSync(dirname);
    }
    ensureDirectoryExistence(op);
    fs.writeFile(op, html, function(){});
});
