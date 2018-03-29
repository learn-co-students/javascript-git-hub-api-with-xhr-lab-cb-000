
function getRepositories() {
  // event.preventDefault()
  const username = document.getElementById('username').value
  const url = `https://api.github.com/users/${username}/repos`
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayRepositories)
  req.open('GET', url)
  req.send()
}



function displayRepositories() {
  let repos = JSON.parse(this.responseText)
  console.log(repos)
  let container = document.getElementById('repositories')
  container.innerHTML = `<ul>${repos.map((repo)=>{
        return '<li>' +
          '<a href="https://github.com/'+ repo.owner.login +'/'+ repo.name +'" target="_blank" >'+ repo.name + '</a> - ' + repo.owner.login +
          ' - <a href="#" data-username="'+ repo.owner.login +'" data-repository="'+ repo.name +'" onclick="getCommits(this)">Get Commits</a>' +
          ' - <a href="#" data-username="'+ repo.owner.login +'" data-repository="'+ repo.name +'" onclick="getBranches(this)">Get Branches</a>' +
          '</li>'
  }).join('')}</ul>`
}

function getCommits(link) {
  // GET /repos/:owner/:repo/commits
  const username = link.dataset.username
  const reponame = link.dataset.repository
  const url = `https://api.github.com/repos/${username}/${reponame}/commits`
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayCommits)
  req.open('GET', url)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const container = document.getElementById('details')
  container.innerHTML = `<ul>${commits.map((obj)=>{
    return '<li>' +
              '<h3>'+ obj.commit.author.name +'&nbsp;('+ obj.author.login +')</h3>' +
              '<p>'+ obj.commit.message +'</p>' +  
            '</li>'    
  }).join('')}</ul>`
}

function getBranches(link) {
  // GET /repos/:owner/:repo/branches
  const username = link.dataset.username
  const reponame = link.dataset.repository
  const url = `https://api.github.com/repos/${username}/${reponame}/branches`
  const req = new XMLHttpRequest()
  req.addEventListener('load', displayBranches)
  req.open('GET', url)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  // console.log(branches)
  const container = document.getElementById('details')
  container.innerHTML = `<ul>${branches.map((branch)=>{
    return '<li>'+ branch.name +'</li>'    
  }).join('')}</ul>`
}

