var fs  = require('fs');
var dir = require('node-dir');
var output = {};
var imagesDir = __dirname+'/public/images';
dir.paths(imagesDir, function(err, paths) {
    if (err) throw err;
    // console.log('files:\n',paths.files);
    // console.log('subdirs:\n', paths.dirs);

    paths.dirs.map(function(i){
        var dirname = i.split('/').reverse()[0];
        var files = paths.files.filter(function(f){
            return f.indexOf(dirname) !== -1;
        }).map(function(f){
            return f.split('/'+dirname+'/')[1];
        });
        output[dirname] = {
            images: files
        };
    });

    fs.writeFile(__dirname+'/data.json', JSON.stringify(output), function(err){
        if(err){
            console.log('error occured', err);
        } else {
            console.log('successfully written the JSON file', __dirname+'/data.json');
        }
    });
});