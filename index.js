function getRepositories() {
  var username = document.getElementById("username").value;
  var req = new XMLHttpRequest();

  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send();
}

function getCommits(click) {
  var name = click.dataset.repository;
  var username = click.dataset.username;
  var req = new XMLHttpRequest();

  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`);
  req.send();
}

function getBranches(click) {
  var name = click.dataset.repository;
  var username = click.dataset.username;
  var req = new XMLHttpRequest();

  req.addEventListener("load", displayBranches);
  req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`);
  req.send();
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
  var innerList = repos.map(r => {
    return `<li><a href='${r.html_url}'>${r.name}</a> - <a href='#' data-repository='${r.name}' data-username='${r.owner.login}' onclick='getCommits(this, "${r.owner.login}")'>Get Commits</a> - <a href='#' data-repository='${r.name}' data-username='${r.owner.login}' onclick='getBranches(this)'>Get Branches</a></li>`;
  }).join("");
  const reposList = `<ul>${innerList}</ul>`

  document.getElementById("repositories").innerHTML = reposList;
}

function displayCommits() {
  var commits = JSON.parse(this.responseText);
  const commitList = `<ul>${commits.map(commit => "<li><strong>" + commit.author.login + " (" + commit.commit.author.name + ")" + "</strong> - " + commit.commit.message + "</li>").join("")}</ul>`;

  document.getElementById("details").innerHTML = commitList;
}

function displayBranches() {
  var branches = JSON.parse(this.responseText);
  const branchList = `<ul>${branches.map(branch => "<li><strong>" + branch.name + "</li><strong>" ).join("")}</ul>`
  document.getElementById("details").innerHTML = branchList;
}
