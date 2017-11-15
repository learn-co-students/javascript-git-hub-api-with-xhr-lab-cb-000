function displayRepositories() {

  var repos = JSON.parse(this.responseText);

  const repoList =
    `<ul> ${repos.map(r => '<li>' + '<a href="' +  r.html_url + '" target="_blank">' + r.name + '</a>' + '- <a href="#" data-author="' + r.owner.login + '"data-repo="' + r.name + '"onclick="getCommits(this);">Get Commits</a>' + ' <a href="#" data-repo="' + r.name + '"data-username="' + r.owner.login +  '" onclick="getBranches(this);">Get Branches</a></li>').join('')}</ul>`;

  document.getElementById("repositories").innerHTML = repoList;

}

function getRepositories() {

  var username = document.getElementById("username");
  var url = `https://api.github.com/users/${username.value}/repos`;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayRepositories);
  req.open("GET", url);
  req.send();


}

function getCommits(el) {
  const author = el.dataset.author;

  document.getElementById("commit").innerHTML = `Repo Name: <h3>${el.dataset.repo}</h3>`;
  const name = el.dataset.repo;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayCommits);
  req.open("GET", `https://api.github.com/repos/${author}/${name}/commits`);
  req.send();
  console.log(req);
}

function displayCommits() {
  const commits = JSON.parse(this.responseText);
  const commitsList =
    `<ul>${commits.map(c => '<li>' + c.commit.author.name + " Message: " + c.commit.message + '</li>' ).join('')}</ul>`;
  document.getElementById("details").innerHTML = commitsList;

  const committed = `<h2> ${commits}`;

}


function getBranches(br){
  console.log(br);
  const repo = br.dataset.repo;
  const username = br.dataset.username;
  const req = new XMLHttpRequest();
  req.addEventListener("load", displayBranches);

  req.open("GET", `https://api.github.com/repos/${username}/${repo}/branches`);
  req.send();
}

function displayBranches(){
  const branches = JSON.parse(this.responseText);
  const branchList = `<ul> ${branches.map(b => '<li>' + b.name + '</li>').join('')}</ul>`;
  document.getElementById('details').innerHTML = branchList;
}
