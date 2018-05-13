function getRepositories(){
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${document.getElementById('username').value}/repos`)
  req.send()
}

function displayRepositories(event,data){
  //this is set to the XMLHttpRequest object that fired the event
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + '- <a href="https://github.com/' +
  r.full_name + '">Link to Repo </a>' + ' - <a href="#" data-repo="' + r.name +
  '" onclick="getCommits(this)">Display Commits</a>' + ' <a href="#" data-repo="' + r.name +
  '" onclick="getBranches(this)">Display Branches</a> </li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el){
  var name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${document.getElementById("username").value}/${name}/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name+ " " + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}


function getBranches(el){
  const name = el.dataset.repository
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${document.getElementById("username").value}/${name}/branches`)
  req.send()
}

function displayBranches(){
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(branches => '<li><strong>' + branches.name + '</strong> - ' + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchList
}
