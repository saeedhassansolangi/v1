const loader = document.querySelector(".loader");
const portfolioSection = document.querySelector("#portfolio .row");

async function loadRepositories() {
  loader.style.display = "block";
  const URL = "https://github-pinned-repositories.herokuapp.com/";
  const response = await fetch(URL);
  const {
    data: {
      user: {
        name,
        company,
        email,
        websiteUrl,
        pinnedItems: { nodes: repos },
      },
    },
  } = await response.json();

  const details = {
    name,
    email,
    education: company,
    portfolio: websiteUrl,
  };

  document.querySelector(
    ".more-info"
  ).innerHTML += `<pre class="json"><code >${JSON.stringify(
    details,
    null,
    4
  )}</code></pre>`;

  repos.map((repo) => {
    const {
      name: repo_name,
      description: repo_description,
      url: repo_url,
      forkCount: forked_count,
      stargazerCount: starred_count,
      // topics,
      languages: { edges: lang_stats },
      homepageUrl: projectLiveURL,
    } = repo;

    const anchor = createEl("a", {
      href: repo_url,
      target: "_blank",
      innerText: repo_name,
    });
    const div = createEl("div", { class: "col-md-6" });
    const div2 = createEl("div", { class: "card mb-3" });
    const card_body = createEl("div", { class: "card-body" });
    const card_title = createEl("h3", { class: "card-title" });
    const card_textAttrs = {
      class: "card-text",
      innerText: repo_description
        ? repo_description.substr(0, 60) + "..."
        : "no description",
    };
    const card_text = createEl("p", { ...card_textAttrs });

    const forkedEl = createEl("span", { title: "fork", class: "forked" });
    forkedEl.innerHTML = `<i class="fas fa-code-branch" style="font-size:10px"></i> forked | ${forked_count}`;

    const starredEl = createEl("span", {
      title: "star",
      class: "starred",
    });
    starredEl.innerHTML = `<i class="far fa-star" style="font-size:10px"></i> starred | ${starred_count}`;

    const forkedrep0s = createEl("div", { class: "repo-meta" });
    forkedrep0s.appendChild(forkedEl);
    forkedrep0s.appendChild(starredEl);

    const ul = createEl("ul", { class: "list-inline" });

    div2.appendChild(card_body);
    card_title.appendChild(anchor);
    card_body.appendChild(card_title);
    card_body.appendChild(card_text);
    card_body.appendChild(forkedrep0s);

    // // topics
    // topics.forEach((topic) => {
    //   card_body.appendChild(
    //     createEl("span", {
    //       innerText: topic || "no topics provided",
    //       title: `Topic : ${topic}`,
    //       class: "topics m-1",
    //     })
    //   );
    // });

    // languages used
    lang_stats.forEach((lang) => {
      const { name: lang_name, color: lang_color } = lang.node;
      const li = createEl("li", { class: "list-inline-item" });
      const span = createEl("span", { style: `color:${lang_color}` });
      const i = createEl("i", {
        style: `color:${lang_color} !important`,
        class: "fas fa-circle fa-xs mr-1",
      });
      span.appendChild(i);
      //
      const spanLang = createEl("span", {
        innerText: lang_name,
        class: "mr-1",
      });

      li.appendChild(span);
      li.appendChild(spanLang);
      ul.appendChild(li);
      card_body.appendChild(ul);
    });

    const divLinks = createEl("div", { class: "btns_url" });

    const linkGithub = createEl("a", {
      href: repo_url,
      class: "card-link",
      target: "_blank",
      innerText: "View Project On Github",
    });

    const linkExternal = createEl("a", {
      href: projectLiveURL,
      class: "card-link",
      target: "_blank",
      innerText: "View Project Live",
    });

    divLinks.appendChild(linkGithub);
    divLinks.appendChild(linkExternal);
    card_body.appendChild(divLinks);
    div.appendChild(div2);
    portfolioSection.append(div);
    loader.style.display = "none";
  });
}

function createEl(type, attrs = {}) {
  const el = document.createElement(type);
  for (const attr in attrs) {
    const value = attrs[attr];
    if (attr === "innerText") el.innerText = value;
    else el.setAttribute(attr, value);
  }
  return el;
}

window.addEventListener("load", loadRepositories);

const navbar = document.querySelector(".navbar-expand-lg");
window.addEventListener("scroll", function (e) {
  if (this.scrollY > 0) {
    navbar.style.background = "#121212";
  } else if (this.scrollY == 0) {
    navbar.style.background = "none";
  }
});
