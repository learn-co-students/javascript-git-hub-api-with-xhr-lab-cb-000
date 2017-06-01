function getRepositories() {
	var username = document.getElementById('username').value
  const req = new XMLHttpRequest()
  req.open("GET", "https://api.github.com/users/" + username + "/repos", true)
  req.addEventListener("load", showRepositories)
  req.send()
}

function showRepositories(event, data) {
	debugger
  var repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}