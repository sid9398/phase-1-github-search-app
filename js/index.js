function init (){
document.getElementById('github-form').addEventListener('submit', function(event) {
    event.preventDefault()
    const searchQuery = document.getElementById('search').value
    searchGitHubUsers(searchQuery)
})}
function searchGitHubUsers(query) {
    fetch(`https://api.github.com/search/users?q=${query}`)
      .then(response => response.json())
      .then(data => {
        // Process the response data and display the results on the page
        displayGitHubUsers(data.items);
      })
      .catch(error => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
      });
  }
  function displayGitHubUsers(users) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';
  
    users.forEach(user => {
      const userElement = document.createElement('div');
      userElement.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" width="100">
        <h3>${user.login}</h3>
        <a href="${user.html_url}" target="_blank">Profile</a>
      `;
  
      resultsContainer.appendChild(userElement);
    });
  }
  function fetchUserRepositories(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => {
        // Process the repositories data and display it on the page
        displayUserRepositories(data);
      })
      .catch(error => {
        // Handle any errors that occur during the request
        console.error('Error:', error);
      });
  }
  
  // Inside the displayGitHubUsers function
  const userElements = document.querySelectorAll('.user');
userElements.forEach(function(userElement) {
  userElement.addEventListener('click', function() {
    const username = userElement.dataset.username;
    fetchUserRepositories(username);
  });
});
  function displayUserRepositories(repositories) {
    const repositoriesContainer = document.getElementById('repositories');
    repositoriesContainer.innerHTML = '';
  
    repositories.forEach(repo => {
      const repoElement = document.createElement('div');
      repoElement.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description}</p>
        <a href="${repo.html_url}" target="_blank">View on GitHub</a>
      `;
  
      repositoriesContainer.appendChild(repoElement);
    });
  }
  document.addEventListener("DOMContentLoaded", init);