type EnemyParams = {
  img: HTMLImageElement;
  size: Size;
  translateOn: number;
};

type ShapeMethods = {
  getHeight(): number;
  getMaxCount(): number;
  build(x: number, y: number): Enemy[];
};

type ShapeInit = (enemy: EnemyParams, count: number) => ShapeMethods;
