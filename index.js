
function getRepositories() {
  var username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`);
  req.send();
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
    document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el) {
  const reponame = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  //req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.open("GET", `https://api.github.com/repos/${username}/${reponame}/commits`);
  req.send();
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
  const reponame = el.dataset.repository;
  const username = el.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);
  //req.open("GET", 'https://api.github.com/repos/octocat/' + name + '/commits')
  req.open("GET", `https://api.github.com/repos/${username}/${reponame}/branches`);
  req.send();

}

function displayBranches() {
   const branches = JSON.parse(this.responseText);
   const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`;
   document.getElementById("details").innerHTML = branchesList;
}
