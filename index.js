function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoNames = `<ul>${repos.map(repo => '<li>' + repo["name"] + ' <a href=' + repo.html_url + '></a>' + ' - <a href="#" data-repo="' + repo.name + '" onclick="getCommits(this)">Get Commits</a>' + ' - <a href="#" data-repo="' + repo.name + '" onclick="getBranches(this)">Get Branches</a>' + '</li>').join('')}</ul>`;
  document.getElementById("repositories").innerHTML = repoNames
}

function displayCommits() {
  var commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li>' + commit.author.login + " : " + commit.commit.author.name + " : " + commit.commit.message + '</li>').join('')}</ul>`;
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function getRepositories() {
  const req = new XMLHttpRequest();
  const username = document.getElementById('username').value;
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos');
  req.send();
}

function getCommits(el) {
  const name = el.dataset.repository;
  const request = new XMLHttpRequest();
  request.addEventListener("load", displayCommits);
  request.open("GET", 'https://api.github.com/repos/' + el.dataset.username + '/' + name + '/commits');
  request.send();
}

function getBranches(el) {
  const name = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + el.dataset.username + '/' + name + '/branches');
  req.send();
}
