function getRepositories() {
    var username = document.getElementById("username").value;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayRepositories);
    req.open("GET", 'https://api.github.com/users/' + username + '/repos' );
    req.send();
   }
  
  function displayRepositories() {
      
    var repos = JSON.parse(this.responseText);
    const displayList = `${repos.map(r => "r.Name: " + r.name + "\nr.owner.login: " + r.owner.login + "\nr.html_url:  " + r.html_url + "\n\n").join('')}`
    var test = `${repos.map(r => "r.Name: " + r.name + ",\n").join('')}`;  
    const repoList = "<ul>" + repos.map(r => '<li>' + r.name + '<br><a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getCommits(this)">Get Commits</a>' + '<br> <a href="' + r.html_url + '">See Repository</a></li>' + '<a href="#" data-repository="' + r.name + '" data-username="' + r.owner.login + '" onclick="getBranches(this)">Get Branches</a><br><br>').join('') + "</ul>";
    document.getElementById("repositories").innerHTML = repoList;
   }
  
  function getCommits(el) {
    const repository = el.dataset.repository;
    const name = el.dataset.username
    const req = new XMLHttpRequest();
    const url = 'https://api.github.com/repos/' + name + '/' + repository + '/commits';
    console.log ("URL:  " + url);
    req.addEventListener("load", displayCommits);
    req.open("GET", url);
    
    req.send();
  }
  
  function displayCommits() {
    console.log(this.responseText);
    const commits = JSON.parse(this.responseText);
    const displayCommitsList = `${commits.map(commit =>  'commit.commit.committer.name: ' + commit.commit.committer.name + '\ncommit.commit.author.name:  ' + commit.commit.author.name + '\ncommit.commit.message:  ' + commit.commit.message + "\n\n").join('')}`
    const commitsList = `<ul>${commits.map(commit =>  '<li><strong>' + commit.commit.committer.name + '</strong> - ' + commit.commit.author.name + '<br>' + commit.commit.message + '</li>').join('')}</ul>`;
    document.getElementById("details").innerHTML = commitsList;
  }
  
  function getBranches(el) {
    const name = el.dataset.username;
    const repository = el.dataset.repository;
    const req = new XMLHttpRequest();
    req.addEventListener("load", displayBranches);
    req.open("GET", 'https://api.github.com/repos/'  + name + '/' + repository + '/branches')
    req.send();
  }
  
  function displayBranches() {
    const branches = JSON.parse(this.responseText);
    console.log("branches:  " + branches);
    const branchList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
    console.log("branches html:  " + branchList);
    document.getElementById("details").innerHTML = branchList;
  }