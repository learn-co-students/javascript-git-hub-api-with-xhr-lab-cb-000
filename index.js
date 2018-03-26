document.addEventListener("DOMContentLoaded", function(){
    var userForm = document.getElementById('username-form')
    userForm.addEventListener('submit', getRepositories)
})

function displayRepositories() {
    var repos = JSON.parse(this.responseText)
    var reposList = '<ul>' + repos.map(function(r)
    {
        var commits_link  = `<a href = "#" onclick = "getCommits(this)" data-repository = "${r.name}" data-username = "${r.owner.login}">commits</a>`
        var branches_link = `<a href = '#' onclick = "getBranches(this)" data-repository = "${r.name}" data-username = "${r.owner.login}"> branches</a>`

        return `<li>${r.name} - <a href = "${r.clone_url}">${r.name}</a>- ${commits_link} - ${branches_link} </li>`
    }).join('') + '</ul>'

    document.getElementById('repositories').innerHTML = reposList
}

function getRepositories(e){
    var username = document.getElementById('username').value
    var req = new XMLHttpRequest()
    req.open('GET', `https://api.github.com/users/${username}/repos`)
    req.send()
    req.addEventListener('load', displayRepositories)
}

function displayCommits(){
    var commits = JSON.parse(this.responseText)
    console.log(commits)
    var commitsList = '<ul>' + commits.map(c => `<li>${c.commit.author.name} - ${c.author.login} - ${c.commit.message}</li>`).join('') + '</ul>'
    document.getElementById('details').innerHTML = commitsList

}
function getCommits(element){

    var repository = element.dataset.repository
    var username = element.dataset.username
    var req = new XMLHttpRequest()
    req.open('GET', `https://api.github.com/repos/${username}/${repository}/commits`)
    req.send()
    req.addEventListener('load', displayCommits)
}

function displayBranches(){
    var branches = JSON.parse(this.responseText)
    var branchesList = '<ul>' + branches.map(b => `<li>${b.name}</li>`).join('') + '</ul>'
    document.getElementById('details').innerHTML = branchesList
}

function getBranches(element){
    var repository = element.dataset.repository
    var username = element.dataset.username
    var req = new XMLHttpRequest()
    req.open('GET', `https://api.github.com/repos/${username}/${repository}/branches`)
    req.send()
    req.addEventListener('load', displayBranches)
}
