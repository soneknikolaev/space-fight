export const Touches = () => {
  let touches: TouchEngine[] = [];

  return {
    add(touch: TouchEngine) {
      touches = touches.filter((oldTouch) => touch.type !== oldTouch.type).concat(touch);
    },

    get(): TouchEngine[] {
      return touches;
    },

    reset() {
      touches = [];
    },
  };
};
