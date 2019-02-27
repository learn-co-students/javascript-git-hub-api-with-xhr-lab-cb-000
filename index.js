var useName ;
var global ;
document.getElementById("username").addEventListener('change', function(e) {
  getRepositories(e) ;
})
function getRepositories(e) {
  console.log(e.target.value) ;
  const repoPath = "https://api.github.com/users/" + e.target.value + "/repos"
  useName = e.target.value ;
  console.log(repoPath) ;
  const req = new XMLHttpRequest();
  req.addEventListener("load", showRepositories);
  req.open("GET",repoPath) ;
  req.send() ;
}

function showRepositories(event, data) {
var repos = JSON.parse(this.responseText);
var testRepo = repos[0] ;
//console.log(testRepo);
// console.log(repos) ;
var repoText = "<ul>"
 repoText += ` ${repos.map( r => "<li>"
 + "name: " + r.name + "<br>"
 + r.html_url + "<br>"
 + "<a href='#' " + "data-repo='" + r.name + "' " + "onclick='getCommits(this) '>"  + 'commits ' + "</a> " + "<br>"
 + "<a href='#' " + "data-repo='" + r.name + "' " + "onclick='getBranches(this) '>"  + 'branches ' + "</a> "
 + "</li> "
)
.join("")} `
 repoText += "</ul>"
//console.log(repoText)
document.getElementById("repositories").innerHTML = repoText ;
}

function getCommits(el) {
  console.log(el.dataset.repo) ;
  const name = el.dataset.repo ;
  const req = new XMLHttpRequest() ;
  req.addEventListener("load", displayCommits) ;
  req.open("GET", "https://api.github.com/repos/" + useName + "/" + name + "/commits");
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText) ;
  global = commits[0] ;
  var commitText = "<ul>" ;
  commitText += `${commits
    .map(
      commit =>
        "<li>" +
        commit.commit.author.name +
        " - " +
        commit.author.login  + " - " +
        commit.commit.message +
        "</li>"
    )
    .join("")}` ;
  commitText += "</ul>"
  document.getElementById("details").innerHTML = commitText ;

}

function getBranches(el) {
  console.log(el.dataset.repo) ;
  const name = el.dataset.repo ;
  const req = new XMLHttpRequest() ;
  req.addEventListener("load", displayBranches) ;
  req.open("GET", "https://api.github.com/repos/" + useName + "/" + name + "/branches");
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText) ;
  global = branches[0] ;
  var commitText = "<ul>" ;
  commitText += `${branches
    .map(
      branch =>
        "<li>" +
        branch.name +
        "</li>"
    )
    .join("")}` ;
  commitText += "</ul>"
  document.getElementById("details").innerHTML = commitText ;

}
