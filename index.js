function getRepositories() {
  var username = document.getElementById("username").value;
  var req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send();
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  var innerList = repos.map(r => {
    return `<li> <a href='${r.html_url}'>${r.name}</a> - <a href='#' data-repository='${r.name}' data-username='${r.owner.login}' onclick='getCommits(this, "${r.owner.login}")'>Get Commits</a> - <a href='#' data-repository='${r.name}' data-username='${r.owner.login}' onclick='getBranches(this)'>Get Branches</a></li>`;
  }).join("");
  var repoList = `<ul>${innerList}</ul>` 
  document.getElementById("repositories").innerHTML = repoList;
} 

function getCommits(clicked) {
  var name = clicked.dataset.repository;
  var username = clicked.dataset.username;
  var req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`);
  req.send();
}

function displayCommits() {
  var commits = JSON.parse(this.responseText);
  var commitsList = `<ul>${commits.map(commit => "<li><strong>" + commit.author.login + " (" + commit.commit.author.name + ")" + "</strong> - " + commit.commit.message + "</li>").join("")}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}

function getBranches(clicked) {
  var name = clicked.dataset.repository;
  var username = clicked.dataset.username;
  var req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`);
  req.send();
}

function displayBranches() {
  var branches = JSON.parse(this.responseText);
  var branchList = `<ul>${branches.map(branch => "<li><strong>" + branch.name + "</li><strong>" ).join("")}</ul>`
  document.getElementById("details").innerHTML = branchList;
}
