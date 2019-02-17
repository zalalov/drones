let path = require('path');
let backendPath = path.normalize(__dirname + '/..');
let rootPath = path.normalize(__dirname + '/../..');

const directory = {
    root: rootPath,
    distDir: rootPath + '/dist',
    assetsDir: backendPath + '/public'
};

export default directory;

