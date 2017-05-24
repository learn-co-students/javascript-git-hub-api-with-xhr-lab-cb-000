const rootURL = 'https://api.github.com'

function getRepositories(){
  var userName = document.getElementById('username').value	
  var uri = rootURL + '/users/' +  userName + '/repos'
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", uri)
  req.send()
}

function displayRepositories(){
	var repos = JSON.parse(this.responseText)
	var reposList = "<ul>" + repos.map(repo => {
		var dataUserName = 'data-username = "' + repo.owner.login  + '"' 
	    var dataRepoName = 'data-repository = "' + repo.name + '"' 
	    return(
		    `<li>
		     <h2>${repo.name}</h2>
             <a href="${repo.html_url}">${repo.html_url}</a><br>
             <a href="#" ${dataUserName} ${dataRepoName} onclick="getCommits(this); return false;">Get Commits</a><br>
             <a href="#" ${dataUserName} ${dataRepoName} onclick="getBranches(this);return false">Get Branches</a><br>
		    </li>`
	    )
	}).join('') + "</ul>";
    document.getElementById('repositories').innerHTML = reposList
}

function getCommits(element){
  var uri = rootURL + "/repos/" + element.dataset.username + "/" + element.dataset.repository + "/commits"
  var req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  req.open("GET", uri)
  req.send()
}

function displayCommits(){
	var commits = JSON.parse(this.responseText)
	var commitsList = "<ul>" + commits.map(commit =>{
		return(
			`<li>
			 Github name: ${commit.committer.login}(${commit.commit.author.name})<br>
			 Commit Message: ${commit.commit.message} 
			 </li>`
		)
	}).join('') + "</ul>";
	document.getElementById('details').innerHTML = commitsList
}

function getBranches(element){
	var dataSet = element.dataset
	// /repos/:owner/:repo/branches
	var uri = rootURL + "/repos/" + dataSet.username + "/" + dataSet.repository + "/branches"
	var req = new XMLHttpRequest()
	req.addEventListener('load', displayBranches)
	req.open("GET", uri)
	req.send()
}

function displayBranches(){
	var branches = JSON.parse(this.responseText)
	var branchesList = "<ul>" + branches.map(branche => {
	    return(
	    	`<li><h3>${branche.name}</h3></li>`
	    )	
	}).join('') + "</ul>";
	document.getElementById('details').innerHTML = branchesList
}
