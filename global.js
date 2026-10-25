console.log('IT’S ALIVE!');

export function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

export async function fetchJSON(url) {
  try {
    // Fetch the JSON file from the given URL
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching or parsing JSON data:', error);
  }
}

const HEADING_LEVELS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export function renderProjects(projects, containerElement, headingLevel = 'h2') {
  if (!(containerElement instanceof Element)) {
    console.error('renderProjects: containerElement is not a valid DOM element', containerElement);
    return;
  }

  // Fall back to h2 if given something that isn't a heading tag
  if (!HEADING_LEVELS.includes(headingLevel)) {
    console.warn(`renderProjects: invalid headingLevel "${headingLevel}", using h2`);
    headingLevel = 'h2';
  }

  // Clear the container so re-rendering doesn't duplicate projects
  containerElement.innerHTML = '';

  if (!Array.isArray(projects) || projects.length === 0) {
    containerElement.innerHTML = '<p>No projects to show yet.</p>';
    return;
  }

  for (const project of projects) {
    const article = document.createElement('article');
    const title = project.title ?? 'Untitled project';
    const image = project.image ?? 'https://vis-society.github.io/labs/2/images/empty.svg';
    article.innerHTML = `
      <${headingLevel}>${title}</${headingLevel}>
      <img src="${image}" alt="${title}">
      <p>${project.description ?? ''}</p>
    `;
    containerElement.appendChild(article);
  }
}

export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}
