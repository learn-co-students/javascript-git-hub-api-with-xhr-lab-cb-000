function getRepositories(){
  var username = document.getElementById('username').value;
  var xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayRepositories);
  xhr.open('GET', 'https://api.github.com/users/' + username + '/repos');
  xhr.send();
}

function displayRepositories(){
  var res = JSON.parse(this.responseText);

  var repoList = "<ul>" + res.map(repo => {
    var dataUsername = 'data-username="' + repo.owner.login + '"';
    var dataRepoName = 'data-repository="' + repo.name + '"';

    return (`
      <li>
        <h2>${repo.name}</h2>
        <a href="${repo.html_url}">${repo.html_url}</a>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getCommits(this)">Get Commits</a>
        <a href="#" ${dataRepoName} ${dataUsername} onclick="getBranches(this)">Get Branches</a>
      </li>
      `)
  }).join('') + "</ul>";

  document.getElementById('repositories').innerHTML = repoList;
}

function getCommits(el){
  var repoName = el.dataset.repository;
  var username = el.dataset.username;

  const uri = "https://api.github.com/repos/" + username + "/" + repoName + "/commits";
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', displayCommits);
  xhr.open("GET", uri);
  xhr.send();
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><h3>' + commit.commit.author.name + ' (' + commit.author.login + ')</h3>' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  const repoName = el.dataset.repository
  const uri = "https://api.github.com" + "/repos/" + el.dataset.username + "/" + repoName + "/branches"
  const xhr = new XMLHttpRequest()
  xhr.addEventListener("load", displayBranches)
  xhr.open("GET", uri)
  xhr.send()
}
function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
