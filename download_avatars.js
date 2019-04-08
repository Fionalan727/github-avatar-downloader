var request = require('request');
var secret = require('./secret');
var fs = require('fs');
console.log('Welcome to the Github Avatar Downloader!');
var owner = process.argv[2];
var repo = process.argv[3];
function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      Authorization: 'token ' + secret.GITHUB_TOKEN
    }
  
  };

  request(options, function(err, res, body) {
    var data = JSON.parse(body);
    cb(err, data);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url).pipe(fs.createWriteStream(filePath));
         
}

getRepoContributors(owner, repo, function(err, result) {
  if(owner === undefined || repo === undefined) {
    console.log("Errors: " + err + " please specify owner/repo");
  }
  
  //console.log("Result:", result);
  result.forEach(function(result) {
    var avatarURL = result.avatar_url;
    var file = './avatars/' + result.login + '.jpg';
    downloadImageByURL(avatarURL, file)
  });
   
});

  