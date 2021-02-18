fetch('https://api.github.com/users/saeedhassansolangi/starred')
  .then((response) => {
    return response.json();
  })
  .then((repos) => {
    let card = repos.map((repo) => {
      return `<div class="col-md-3">
        <div class="card mb-3" class="cards" style="background-color: #272727;">
          <div class="row g-0">
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${repo.name}</h5>
                <p class="card-text">${repo.description}</p>
                <p class="card-text"><small class="text-muted">Last updated ${repo.created_at}</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      `;
    });

    document.querySelector('#portfolio .row').innerHTML = card;
  });
