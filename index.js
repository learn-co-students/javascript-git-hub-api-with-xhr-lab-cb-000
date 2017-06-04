const rootURL = "https://api.github.com"

function getRepositories() {
	const username = document.getElementById('username').value
  const url = rootURL + "/users/" + username + "/repos"
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", url)
  req.send()
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  const repoList = "<ul>" + repos.map(r => {
  	const dataUser = 'data-username="' + r.owner.login + '"'
    const dataRepo = 'data-repository="' + r.name + '"'
    return (`<li>
    					<h2>${r.name}</h2>
    					<a href="#" ${r.html_url}">${r.html_url}</a><br>
    					<a href="#" ${dataUser} ${dataRepo} onclick="getCommits(this)">Get Commits</a><br>
    					<a href="#" ${dataUser} ${dataRepo} onclick="getBranches(this)">Get Branches</a><br>
    				</li>`)
  }).join('') + "<ul>";
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
	// GET /repos/:owner/:repo/commits
  const repoName = el.dataset.repository
  const userName = el.dataset.username
  const url = rootURL + '/repos/' + userName + '/' + repoName + '/commits'
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits);
  req.open("GET", url)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = "<ul>" + commits.map(c => {
  	return (`<li>
  					<h4>Name: ${c.commit.author.name}</h4>
  					<p>Message: ${c.commit.message}</p>
  					<p>URL: ${c.commit.url}</p>
  					</li>`)
  	}).join('') + "</ul>"
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
	// GET /repos/:owner/:repo/branches
	const repoName = el.dataset.repository
  const userName = el.dataset.username
  const url = rootURL + '/repos/' + userName + '/' + repoName + '/branches'
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches);
  req.open("GET", url)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const number = branches.length
  const branchesList = "<ul>" + `<h2>Total Branches: ${number}</h2>` + branches.map(b => {
  	return (`<li>
  					<h4>Branch Name: ${b.name}</h4>
  					</li>`)
  	}).join('') + "</ul>"
  document.getElementById("details").innerHTML = branchesList
}