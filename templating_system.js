
console.log("<- Apertus Newsletter Template Renderer v0.01 ->");
console.log("Rendering for "+process.argv[2]);

var handlebars = require('handlebars'),
    fs = require('fs'),
    path = require('path');

var date = process.argv[2];
var data = JSON.parse(fs.readFileSync('newsletter_data/'+date+'/data.json', 'utf8'));

var templatecontent;
fs.readFile('newsletter.mjml', 'utf-8', function read(err, data) {
    if (err) {
        throw err;
    }
    templatecontent = data;
    renderTemplate();
});
function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}
function renderTemplate(){
    var template = handlebars.compile(templatecontent, {noEscape:true});
    var html = template(data);
    var op = "rendered_mjml/"+date+"/newsletter.mjml";

    ensureDirectoryExistence(op);
    fs.writeFile(op, html, function(){});
}