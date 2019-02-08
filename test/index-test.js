describe('index', () => {
  describe('page', () => {
    it('has a form', () => {
      var form = document.getElementsByTagName("form")[0]
      expect(form).toExist()
      expect(form).toMatch(/getRepositories()/)
      expect(document.getElementById("username")).toExist()
    })
  })

  describe('callback functions', () => {
    describe('displayCommits', () => {
      it('parses and displays json values', () => {
        var resp = { responseText: commitsData() }
        displayCommits.call(resp)
        el = document.getElementById("details")
        expect(el.innerHTML).toMatch(/The Octocat/)
        expect(el.innerHTML).toMatch(/The Octocat/)
        expect(el.innerHTML).toMatch(/Pointing to the guide for forking/)
      })
    })

    describe('displayBranches', () => {
      it('parses and displays json values', () => {
        var resp = { responseText: branchesData() }
        displayBranches.call(resp)
        el = document.getElementById("details")
        expect(el.innerHTML).toMatch(/master/)
      })
    })
    describe('displayRepositories', () => {
      it('parses and displays json values', () => {
        var resp = { responseText: reposData() }
        displayRepositories.call(resp)
        el = document.getElementById("repositories")
        expect(el.innerHTML).toMatch(/Hello-World/)
        expect(el.innerHTML).toMatch(/octocat/)
        expect(el.innerHTML).toMatch(/https:\/\/github.com\/octocat\/Hello-World/)
      })
    })
  })

  describe('xhr functions', () => {
    let xhr
    let requests
    let el

    before(() => {
      el = { dataset: { repository: 'Spoon-Knife', username: 'octocat' } }
      xhr = sinon.useFakeXMLHttpRequest()
      window.XMLHttpRequest = xhr

      xhr.onCreate = function(req) {
        requests.push(req)
      }
    })

    beforeEach(() => {
      requests = []
    })

    after(() => {
      requests = []
      xhr.restore()
    })

    describe('getRepositories', () => {
      it('calls out to Github', () => {
        document.getElementById("username").value = 'octocat'
        getRepositories()
        expect(requests.length).toBe(1)
        expect(requests[0].url).toBe('https://api.github.com/users/octocat/repos')
      })
    })

    describe('getCommits', () => {
      it('calls out to Github', () => {
        getCommits(el)
        expect(requests.length).toBe(1)
        expect(requests[0].url).toBe('https://api.github.com/repos/octocat/Spoon-Knife/commits')
      })
    })

    describe('getBranches', () => {
      it('calls out to Github', () => {
        getBranches(el)
        expect(requests.length).toBe(1)
        expect(requests[0].url).toBe('https://api.github.com/repos/octocat/Spoon-Knife/branches')
      })
    })

  })
})

function commitsData() {
  const commits = [
    {
      "sha": "d0dd1f61b33d64e29d8bc1372a94ef6a2fee76a9",
      "node_id": "MDY6Q29tbWl0MTMwMDE5MjpkMGRkMWY2MWIzM2Q2NGUyOWQ4YmMxMzcyYTk0ZWY2YTJmZWU3NmE5",
      "commit": {
        "author": {
          "name": "The Octocat",
          "email": "octocat@nowhere.com",
          "date": "2014-02-12T23:20:44Z"
        },
        "committer": {
          "name": "The Octocat",
          "email": "octocat@nowhere.com",
          "date": "2014-02-12T23:20:44Z"
        },
        "message": "Pointing to the guide for forking",
        "tree": {
          "sha": "d7cee29eaada459ba458a63ad983a89915c6a10a",
          "url": "https://api.github.com/repos/octocat/Spoon-Knife/git/trees/d7cee29eaada459ba458a63ad983a89915c6a10a"
        },
        "url": "https://api.github.com/repos/octocat/Spoon-Knife/git/commits/d0dd1f61b33d64e29d8bc1372a94ef6a2fee76a9",
        "comment_count": 127,
        "verification": {
          "verified": false,
          "reason": "unsigned",
          "signature": null,
          "payload": null
        }
      },
      "url": "https://api.github.com/repos/octocat/Spoon-Knife/commits/d0dd1f61b33d64e29d8bc1372a94ef6a2fee76a9",
      "html_url": "https://github.com/octocat/Spoon-Knife/commit/d0dd1f61b33d64e29d8bc1372a94ef6a2fee76a9",
      "comments_url": "https://api.github.com/repos/octocat/Spoon-Knife/commits/d0dd1f61b33d64e29d8bc1372a94ef6a2fee76a9/comments",
      "author": {
        "login": "octocat",
        "id": 583231,
        "node_id": "MDQ6VXNlcjU4MzIzMQ==",
        "avatar_url": "https://avatars3.githubusercontent.com/u/583231?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "committer": {
        "login": "octocat",
        "id": 583231,
        "node_id": "MDQ6VXNlcjU4MzIzMQ==",
        "avatar_url": "https://avatars3.githubusercontent.com/u/583231?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "parents": [
        {
          "sha": "bb4cc8d3b2e14b3af5df699876dd4ff3acd00b7f",
          "url": "https://api.github.com/repos/octocat/Spoon-Knife/commits/bb4cc8d3b2e14b3af5df699876dd4ff3acd00b7f",
          "html_url": "https://github.com/octocat/Spoon-Knife/commit/bb4cc8d3b2e14b3af5df699876dd4ff3acd00b7f"
        }
      ]
    },
    {
      "sha": "bb4cc8d3b2e14b3af5df699876dd4ff3acd00b7f",
      "node_id": "MDY6Q29tbWl0MTMwMDE5MjpiYjRjYzhkM2IyZTE0YjNhZjVkZjY5OTg3NmRkNGZmM2FjZDAwYjdm",
      "commit": {
        "author": {
          "name": "The Octocat",
          "email": "octocat@nowhere.com",
          "date": "2014-02-04T22:38:36Z"
        },
        "committer": {
          "name": "The Octocat",
          "email": "octocat@nowhere.com",
          "date": "2014-02-12T23:18:55Z"
        },
        "message": "Create styles.css and updated README",
        "tree": {
          "sha": "a639e96f9038797fba6e0469f94a4b0cc459fa68",
          "url": "https://api.github.com/repos/octocat/Spoon-Knife/git/trees/a639e96f9038797fba6e0469f94a4b0cc459fa68"
        },
        "url": "https://api.github.com/repos/octocat/Spoon-Knife/git/commits/bb4cc8d3b2e14b3af5df699876dd4ff3acd00b7f",
        "comment_count": 12,
        "verification": {
          "verified": false,
          "reason": "unsigned",
          "signature": null,
          "payload": null
        }
      },
      "url": "https://api.github.com/repos/octocat/Spoon-Knife/commits/bb4cc8d3b2e14b3af5df699876dd4ff3acd00b7f",
      "html_url": "https://github.com/octocat/Spoon-Knife/commit/bb4cc8d3b2e14b3af5df699876dd4ff3acd00b7f",
      "comments_url": "https://api.github.com/repos/octocat/Spoon-Knife/commits/bb4cc8d3b2e14b3af5df699876dd4ff3acd00b7f/comments",
      "author": {
        "login": "octocat",
        "id": 583231,
        "node_id": "MDQ6VXNlcjU4MzIzMQ==",
        "avatar_url": "https://avatars3.githubusercontent.com/u/583231?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "committer": {
        "login": "octocat",
        "id": 583231,
        "node_id": "MDQ6VXNlcjU4MzIzMQ==",
        "avatar_url": "https://avatars3.githubusercontent.com/u/583231?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "parents": [
        {
          "sha": "a30c19e3f13765a3b48829788bc1cb8b4e95cee4",
          "url": "https://api.github.com/repos/octocat/Spoon-Knife/commits/a30c19e3f13765a3b48829788bc1cb8b4e95cee4",
          "html_url": "https://github.com/octocat/Spoon-Knife/commit/a30c19e3f13765a3b48829788bc1cb8b4e95cee4"
        }
      ]
    },
    {
      "sha": "a30c19e3f13765a3b48829788bc1cb8b4e95cee4",
      "node_id": "MDY6Q29tbWl0MTMwMDE5MjphMzBjMTllM2YxMzc2NWEzYjQ4ODI5Nzg4YmMxY2I4YjRlOTVjZWU0",
      "commit": {
        "author": {
          "name": "The Octocat",
          "email": "octocat@nowhere.com",
          "date": "2014-02-04T22:38:24Z"
        },
        "committer": {
          "name": "The Octocat",
          "email": "octocat@nowhere.com",
          "date": "2014-02-12T23:18:55Z"
        },
        "message": "Created index page for future collaborative edits",
        "tree": {
          "sha": "9bfbcbc67545f6b5870e9c8f3687943b9cd3f205",
          "url": "https://api.github.com/repos/octocat/Spoon-Knife/git/trees/9bfbcbc67545f6b5870e9c8f3687943b9cd3f205"
        },
        "url": "https://api.github.com/repos/octocat/Spoon-Knife/git/commits/a30c19e3f13765a3b48829788bc1cb8b4e95cee4",
        "comment_count": 57,
        "verification": {
          "verified": false,
          "reason": "unsigned",
          "signature": null,
          "payload": null
        }
      },
      "url": "https://api.github.com/repos/octocat/Spoon-Knife/commits/a30c19e3f13765a3b48829788bc1cb8b4e95cee4",
      "html_url": "https://github.com/octocat/Spoon-Knife/commit/a30c19e3f13765a3b48829788bc1cb8b4e95cee4",
      "comments_url": "https://api.github.com/repos/octocat/Spoon-Knife/commits/a30c19e3f13765a3b48829788bc1cb8b4e95cee4/comments",
      "author": {
        "login": "octocat",
        "id": 583231,
        "node_id": "MDQ6VXNlcjU4MzIzMQ==",
        "avatar_url": "https://avatars3.githubusercontent.com/u/583231?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "committer": {
        "login": "octocat",
        "id": 583231,
        "node_id": "MDQ6VXNlcjU4MzIzMQ==",
        "avatar_url": "https://avatars3.githubusercontent.com/u/583231?v=4",
        "gravatar_id": "",
        "url": "https://api.github.com/users/octocat",
        "html_url": "https://github.com/octocat",
        "followers_url": "https://api.github.com/users/octocat/followers",
        "following_url": "https://api.github.com/users/octocat/following{/other_user}",
        "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
        "organizations_url": "https://api.github.com/users/octocat/orgs",
        "repos_url": "https://api.github.com/users/octocat/repos",
        "events_url": "https://api.github.com/users/octocat/events{/privacy}",
        "received_events_url": "https://api.github.com/users/octocat/received_events",
        "type": "User",
        "site_admin": false
      },
      "parents": [
  
      ]
    }
  ]
  return(JSON.stringify(commits))
}
function branchesData() {
  const branches = [
  {
    "name": "master",
    "commit": {
      "sha": "6dcb09b5b57875f334f61aebed695e2e4193db5e",
      "url": "https://api.github.com/repos/octocat/Hello-World/commits/c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc"
    },
    "protected": true,
    "protection_url": "https://api.github.com/repos/octocat/Hello-World/branches/master/protection"
  }
  ]
  return(JSON.stringify(branches))
}
function reposData() {
  const repos = [
  {
    "id": 1296269,
    "owner": {
      "login": "octocat",
      "id": 1,
      "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      "gravatar_id": "",
      "url": "https://api.github.com/users/octocat",
      "html_url": "https://github.com/octocat",
      "followers_url": "https://api.github.com/users/octocat/followers",
      "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      "organizations_url": "https://api.github.com/users/octocat/orgs",
      "repos_url": "https://api.github.com/users/octocat/repos",
      "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/octocat/received_events",
      "type": "User",
      "site_admin": false
    },
    "name": "Hello-World",
    "full_name": "octocat/Hello-World",
    "description": "This your first repo!",
    "private": false,
    "fork": true,
    "url": "https://api.github.com/repos/octocat/Hello-World",
    "html_url": "https://github.com/octocat/Hello-World",
    "archive_url": "http://api.github.com/repos/octocat/Hello-World/{archive_format}{/ref}",
    "assignees_url": "http://api.github.com/repos/octocat/Hello-World/assignees{/user}",
    "blobs_url": "http://api.github.com/repos/octocat/Hello-World/git/blobs{/sha}",
    "branches_url": "http://api.github.com/repos/octocat/Hello-World/branches{/branch}",
    "clone_url": "https://github.com/octocat/Hello-World.git",
    "collaborators_url": "http://api.github.com/repos/octocat/Hello-World/collaborators{/collaborator}",
    "comments_url": "http://api.github.com/repos/octocat/Hello-World/comments{/number}",
    "commits_url": "http://api.github.com/repos/octocat/Hello-World/commits{/sha}",
    "compare_url": "http://api.github.com/repos/octocat/Hello-World/compare/{base}...{head}",
    "contents_url": "http://api.github.com/repos/octocat/Hello-World/contents/{+path}",
    "contributors_url": "http://api.github.com/repos/octocat/Hello-World/contributors",
    "deployments_url": "http://api.github.com/repos/octocat/Hello-World/deployments",
    "downloads_url": "http://api.github.com/repos/octocat/Hello-World/downloads",
    "events_url": "http://api.github.com/repos/octocat/Hello-World/events",
    "forks_url": "http://api.github.com/repos/octocat/Hello-World/forks",
    "git_commits_url": "http://api.github.com/repos/octocat/Hello-World/git/commits{/sha}",
    "git_refs_url": "http://api.github.com/repos/octocat/Hello-World/git/refs{/sha}",
    "git_tags_url": "http://api.github.com/repos/octocat/Hello-World/git/tags{/sha}",
    "git_url": "git:github.com/octocat/Hello-World.git",
    "hooks_url": "http://api.github.com/repos/octocat/Hello-World/hooks",
    "issue_comment_url": "http://api.github.com/repos/octocat/Hello-World/issues/comments{/number}",
    "issue_events_url": "http://api.github.com/repos/octocat/Hello-World/issues/events{/number}",
    "issues_url": "http://api.github.com/repos/octocat/Hello-World/issues{/number}",
    "keys_url": "http://api.github.com/repos/octocat/Hello-World/keys{/key_id}",
    "labels_url": "http://api.github.com/repos/octocat/Hello-World/labels{/name}",
    "languages_url": "http://api.github.com/repos/octocat/Hello-World/languages",
    "merges_url": "http://api.github.com/repos/octocat/Hello-World/merges",
    "milestones_url": "http://api.github.com/repos/octocat/Hello-World/milestones{/number}",
    "mirror_url": "git:git.example.com/octocat/Hello-World",
    "notifications_url": "http://api.github.com/repos/octocat/Hello-World/notifications{?since, all, participating}",
    "pulls_url": "http://api.github.com/repos/octocat/Hello-World/pulls{/number}",
    "releases_url": "http://api.github.com/repos/octocat/Hello-World/releases{/id}",
    "ssh_url": "git@github.com:octocat/Hello-World.git",
    "stargazers_url": "http://api.github.com/repos/octocat/Hello-World/stargazers",
    "statuses_url": "http://api.github.com/repos/octocat/Hello-World/statuses/{sha}",
    "subscribers_url": "http://api.github.com/repos/octocat/Hello-World/subscribers",
    "subscription_url": "http://api.github.com/repos/octocat/Hello-World/subscription",
    "svn_url": "https://svn.github.com/octocat/Hello-World",
    "tags_url": "http://api.github.com/repos/octocat/Hello-World/tags",
    "teams_url": "http://api.github.com/repos/octocat/Hello-World/teams",
    "trees_url": "http://api.github.com/repos/octocat/Hello-World/git/trees{/sha}",
    "homepage": "https://github.com",
    "language": null,
    "forks_count": 9,
    "stargazers_count": 80,
    "watchers_count": 80,
    "size": 108,
    "default_branch": "master",
    "open_issues_count": 0,
    "has_issues": true,
    "has_wiki": true,
    "has_pages": false,
    "has_downloads": true,
    "pushed_at": "2011-01-26T19:06:43Z",
    "created_at": "2011-01-26T19:01:12Z",
    "updated_at": "2011-01-26T19:14:43Z",
    "permissions": {
      "admin": false,
      "push": false,
      "pull": true
    }
  }
  ]
  return(JSON.stringify(repos))
}
