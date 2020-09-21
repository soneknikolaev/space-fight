type EnemyParams = {
  img: HTMLImageElement;
  size: Size;
  translateOn: number;
  single: boolean;
};

type ShapeMethods = {
  getHeight(): number;
  build(enemy: Enemy): Enemy[];
};

type ShapeInit = (enemy: EnemyParams, count: number) => ShapeMethods;

interface Shape {
  line: ShapeInit;
  wall: ShapeInit;
}
