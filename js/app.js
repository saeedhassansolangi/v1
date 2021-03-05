fetch('https://api.github.com/users/saeedhassansolangi/starred')
  .then((response) => {
    return response.json();
  })
  .then((repos) => {
    let card = repos.map((repo) => {
      return `
        <div class="col-md-5">
          <div class="card mb-3" style="background-color: #272727;">
              <div class="card-body">
                <h5 class="card-title">${repo.name.toUpperCase()}</h5>
                <p class="card-text">${repo.description.slice(0, 50)}...</p>
                <p class="card-text">
                <small class="text-muted">Created at ${new Date(
                  repo.created_at
                ).toLocaleString()}</small>
                <small class="text-muted">Last Updated at ${new Date(
                  repo.updated_at
                ).toLocaleString()}</small>
                </p>
                <div >
                <a href="${
                  repo.html_url
                }" target="_blank"  class="card-link">View Project On Github </a> 
                <a href="${
                  repo.homepage
                }" target="_blank"  class="card-link">View Project Live </a> 
                </div>
              </div>
            </div>
          
      </div>`;
    });

    document.querySelector('#portfolio .row').innerHTML = card;
  })
  .catch((error) => {
    document.querySelector('#portfolio .row').innerHTML = error.message;
  });
