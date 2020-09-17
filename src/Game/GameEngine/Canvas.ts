import { LogicException } from 'Service/Exception';

export const Canvas = (ref: React.RefObject<HTMLCanvasElement>) => {
  return {
    get(): HTMLCanvasElement {
      const { current } = ref;

      if (current) {
        return current;
      }

      throw new LogicException("Canvas doesn't exist");
    },

    getContext(): CanvasRenderingContext2D {
      const context = this.get().getContext('2d');

      if (context) {
        // init canvas context
        context.lineCap = 'round';
        context.textBaseline = 'top';

        return context;
      }

      throw new LogicException("Context doesns't exist");
    },

    getSize(): Size {
      const { width, height } = this.get().getBoundingClientRect();

      return { width, height };
    },

    setContextStyles(styles: GraphCanvasContextStyle): void {
      Object.assign(this.getContext(), styles);
    },
  };
};
