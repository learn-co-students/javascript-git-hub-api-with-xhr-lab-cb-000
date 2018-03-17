function getRepositories() {
  var username = document.getElementById('username').value;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayRepositories);
  req.open('GET', `https://api.github.com/users/${username}/repos`);
  req.send();
}

function displayRepositories() {
  const repos = JSON.parse(this.responseText);
  const repoList = repos.map(repo => {return '<p><strong>' + repo.name + '</strong></p><p><a href="' + repo.html_url + '">View on Github</a></p><p><a href="#" onclick="getCommits(this)" data-username="' + repo.owner.login + '" data-repository="' + repo.name + '">View Commits</a></p><p><a href="#" onclick="getBranches(this)" data-username="' + repo.owner.login  + '" data-repository="' + repo.name + '">View Branches</a></p><br>'}).join('');
  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el) {
  var username = el.dataset.username;
  var repository = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayCommits);
  req.open('GET', `https://api.github.com/repos/${username}/${repository}/commits`);
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitList = `<h4>Commits</h4>${commits.map(commit => {return '<p><strong>Authors Github Username</strong><br>' + commit.author.login + '</p><p><strong>Authors Full Name</strong><br>' + commit.commit.author.name + '</p><p><strong>Message</strong><br>' + commit.commit.message + '</p><br>'}).join('')}`;
  document.getElementById('commits').innerHTML = commitList;
}

function getBranches(el) {
  var username = el.dataset.username;
  var repository = el.dataset.repository;
  const req = new XMLHttpRequest();
  req.addEventListener('load', displayBranches);
  req.open('GET', `https://api.github.com/repos/${username}/${repository}/branches`);
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchList = `<h4>Branches</h4>${branches.map(branch => {return `<p>${branch.name}</p>`}).join('')}`;
  document.getElementById('branches').innerHTML = branchList;
}
