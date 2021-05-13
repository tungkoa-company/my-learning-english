export const testFunction = (func: string, component: any) => {
  document.addEventListener('keydown', (ev) => {
    if (ev.ctrlKey) {
      component[func]();
    }
  });
};

export const randomId = () => Math.random().toString(36);
