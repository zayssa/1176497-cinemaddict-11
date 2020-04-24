export const render = (container, component) => {
  container.appendChild(component.getElement());
};


export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
