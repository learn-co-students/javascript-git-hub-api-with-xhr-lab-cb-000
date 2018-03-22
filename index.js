function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li><a href="' + r.html_url + '">' + r.name + '</a> -' + r.owner.login + '- <a href="#" data-repository="'+ r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a> - <a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a></li>').join('')} </ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function displayCommits(event, data) {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(c => '<li><strong>' + c.author.login + ' ' + c.commit.author.name + '</strong> - ' + c.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function displayBranches(event, data) {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(b => '<li><strong>' + b.name +  '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}

function getRepositories() {
  var username = document.getElementById("username").value;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", 'https://api.github.com/users/' + username + '/repos')
  req.send()
  console.log("end getRepository")
}

function getCommits(el) {
  const name = el.dataset.username
  const repo = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", 'https://api.github.com/repos/' + name + '/' + repo + '/commits')
  req.send()
}
function getBranches(el) {
  const name = el.dataset.username
  const repo = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", 'https://api.github.com/repos/' + name + '/' + repo + '/branches')
  req.send()
}
