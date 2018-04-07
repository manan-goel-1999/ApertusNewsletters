var gulp = require('gulp');
var exec = require('child_process').exec;
var path = path = require('path');
var fs = require('fs');
const arg = (argList => {

  let arg = {}, a, opt, thisOpt, curOpt;
  for (a = 0; a < argList.length; a++) {

    thisOpt = argList[a].trim();
    opt = thisOpt.replace(/^\-+/, '');

    if (opt === thisOpt) {
      if (curOpt) arg[curOpt] = opt;
      curOpt = null;

    }
    else {
      curOpt = opt;
      arg[curOpt] = true;

    }

  }

  return arg;

})(process.argv);

gulp.task('default', renderNewsletter);

function renderNewsletter(done) {
	exec("node templating_system.js "+arg["r"], function (err, stdout, stderr) {
		console.log("[Rendering MJML from template]");
		console.log(stdout);
		console.log(stderr);
		MjmlCompilation();
	});
  	function MjmlCompilation(){
  		var inputmjml = "rendered_mjml/"+arg["r"]+"/newsletter.mjml";
  		var outputhtml = "rendered_output/"+arg["r"]+"/newsletter.html";
  		exec("mjml -r "+inputmjml+" -o "+outputhtml, function (err, stdout, stderr) {
			console.log("[Rendering HTML from MJML]");
			console.log(stdout);
			console.log(stderr);
			AssetTransfer();
		});
  	};

  	function AssetTransfer() {
  		var inputassets = './newsletter_data/'+arg['r']+'/assets/**';
  		var sharedassets= './newsletter_data/sharedassets/**';
  		var outputassets= './rendered_output/'+arg['r']+'/assets/';
  		ensureDirectoryExistence(inputassets);
  		ensureDirectoryExistence(sharedassets);
  		ensureDirectoryExistence(outputassets);
  		gulp.src(inputassets).pipe(gulp.dest(outputassets));
  		gulp.src(sharedassets).pipe(gulp.dest(outputassets));
  	};

	function ensureDirectoryExistence(filePath) {
	    var dirname = path.dirname(filePath);
	    if (fs.existsSync(dirname)) {
	        return true;
	    }
	    ensureDirectoryExistence(dirname);
	    fs.mkdirSync(dirname);
	}
	done();
}