function getRepositories()
{
  var username = document.getElementById("username").value;
  const req = new XMLHttpRequest();
  req.addEventListener("load",displayRepositories);
  req.open("GET",'https://api.github.com/users/'+username+'/repos');
  req.send();
}
function displayRepositories(event,data)
{
    var repos = JSON.parse(this.responseText);
    console.log(repos);
    const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repository="'+r.name+'" data-username="'+r.owner.login+'" onclick="getCommits(this)">'+r.html_url+'"</a></li>').join('')}</ul>`
    document.getElementById("repositories").innerHTML = repoList;
}

function getCommits(el)
{
  const repo = el.dataset.repository;
  const user = el.dataset.username;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", 'https://api.github.com/repos/'+user+'/'+repo+'/commits')
  req.send()
}

function displayCommits()
{
  const commits = JSON.parse(this.responseText);
  const commitsList = `<ul>${commits.map(commit => '<li><strong>'+commit.commit.author.name+' ' + commit.author.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el)
{
  const repo = el.dataset.repository;
  const user = el.dataset.username;
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", 'https://api.github.com/repos/'+user+'/'+repo+'/branches')
  req.send()
}

function displayBranches()
{
  const branches = JSON.parse(this.responseText);
  const branchesList = `<ul>${branches.map(branch => '<li><strong>'+branch.name+'</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList

}
