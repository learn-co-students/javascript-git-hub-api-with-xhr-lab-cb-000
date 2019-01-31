

function getRepositories() {
  const name = document.getElementById("username").value
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${name}/repos`);
  req.send();
}

function displayRepositories(event, data) {
  var repos = JSON.parse(this.responseText);
//console.log("This Is responseText: " + this.responseText);
  const repoList = `<ul>${repos
    .map(
      r => `<li>${r.full_name}<br>
            ${r.html_url}<br>
	    <a href="#" data-repo="${r.name}" onclick="getCommits(this)">Get Commits</a><br>
	    <a href="#" data-repo="${r.name}" onclick="getBranches(this)">Get Branches</a><br>
	    </li>`
    )
    .join("")}</ul>`;
  document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const name = el.dataset.repository;
  const user = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", "https://api.github.com/repos/" + user + "/" + name + "/commits");
  req.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
    const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`

//  const commitsList = `<ul>${commits.map( commit => "<li><strong>${commit.commit.author.name} (${commit.author.login})</strong> - ${commit.commit.message}</li>").join("")}</ul>`;
  document.getElementById("details").innerHTML = commitsList;
}

function getBranches(el) {
  const name = el.dataset.repository;
  const user = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  req.open("GET", "https://api.github.com/repos/" + user + "/" + name + "/branches");
  req.send();
}

function displayBranches() {
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
//  const branchesList = `<ul>${branches.map( branch => \`<li><strong>${branch.branch.author.name} (${branch.author.login})</strong> - ${branch.branch.message}</li>\`).join("")}</ul>`;
  document.getElementById("details").innerHTML = branchesList;
}
