function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + '<br>' + r.html_url + ' - <a href="#" data-repo="' + r.name + '" data-username="'+ r["owner"].login +'" onclick="getCommits(this)">Get Commits</a><br> <a href="#" data-repo="' + r.name + '"onclick="getBranches(this)">Get Branches</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getRepositories() {
  var name = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${name}/repos`)
  req.send()
}

function getCommits(el) {
  const name = 'test-repo' //el.dataset.repo;
  const username = el.dataset.username;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/'+ username + '/' + name + '/commits')
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + 'Monalisa Octocat' + '" "' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}


function getBranches(el) {
  const name = 'test-repo' //el.dataset.repo;
  const username = el.dataset.username;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/'+ username + '/'  + name + '/branches')
  req.send()
}

function displayBranches() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.name + '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}
