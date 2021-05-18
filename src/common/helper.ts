export const testFunction = (func: string, component: any) => {
  document.addEventListener('keydown', (ev) => {
    if (ev.ctrlKey) {
      component[func]();
    }
  });
};

export const randomId = () => Math.random().toString(36);

export const randomChangePlacesItemInArray = (array: Array<any>) => {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};
