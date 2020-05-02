export const render = (container, component) => {
  container.appendChild(component.getElement());
};

export const remove = (component) => {
  if (component) {
    component.getElement().remove();
    component.removeElement();
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
