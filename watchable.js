'use strict';
var util = require('util'),
    path = require('path'),
    crypto = require('crypto'),
    fs = require('fs'),
    watchFileName,
    watchFile;

// Attempts to see if fs.watch will work. On some platforms, it doesn't.
// See: http://nodejs.org/api/fs.html#fs_caveats
// Sends the callback true if fs.watch will work, false if it won't
//
// Caveats:
// If there is no writable tmp directory, it will also return true, although
// a warning message will be displayed.
var changeDetected = false;

function check(cb) {
  var tmpdir;

  watchable.cb = cb;
  changeDetected = false;

  if (process.platform === 'win32') {
    tmpdir = process.env.TEMP;
  } else if (process.env.TMPDIR) {
    tmpdir = process.env.TMPDIR;
  } else {
    tmpdir = '/tmp';
  }

  watchFileName = path.join(tmpdir, 'nodemonCheckFsWatch' + crypto.randomBytes(16).toString('hex'));

  console.log(watchFileName);

  watchFile = fs.openSync(watchFileName, 'w');
  if (watchFile < 0) {
    util.log('Unable to write to temp directory. If you experience problems with file reloading, ensure ' + tmpdir + ' is writable.');
    cb(true);
    return;
  }

  var start = Date.now();

  fs.watch(watchFileName, function() {
    console.log('fs.watch');
    console.log(Date.now() - start);
    if (changeDetected) { return; }

    changeDetected = true;
    cb(true);
  });

  fs.watchFile(watchFileName, function () {
    console.log('fs.watchFile');
    console.log(Date.now() - start);
  });

  // This should trigger fs.watch, if it works
  setTimeout(function () {
    fs.writeSync(watchFile, '1');
    // setTimeout(function() { verify(); }, 1000);
  }, 250);

}

// Verifies that fs.watch was not triggered and sends false to the callback
var verify = function() {
  fs.unlinkSync(watchFileName);

  if (changeDetected) { return; }
  changeDetected = true; // prevents the `ready` being called twice
  console.log('timeout');
  watchable.cb(false);
};

var watchable = module.exports = function (config, ready) {
  check(function(success) {
    config.system.watchWorks = success;
    ready();
  });
};

watchable.check = check;

if (!module.parent) {
  var config = { system: { watchWorks: -1 } };
  watchable(config, function () {
    console.log('success?', config.system.watchWorks);
    process.exit();
  });
}