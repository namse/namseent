import { CanvasKit, EmbindObject } from "canvaskit-wasm";

export function getGcCanvasKitPackage(canvasKit: CanvasKit): {
  gcCanvasKit: CanvasKit;
  garbages: EmbindObject<any>[];
  deleteGarbages: () => void;
} {
  const garbages: EmbindObject<any>[] = [];
  const deleteGarbages = () => {
    garbages.forEach((garbage) => {
      if (!garbage.isDeleted()) {
        garbage.delete();
      }
    });
    garbages.length = 0; // clear
  };

  return {
    gcCanvasKit: {
      ...canvasKit,
      Paint: makeItGc(canvasKit.Paint, garbages),
      Path: makeItGc(canvasKit.Path, garbages) as any,
      Shader: {
        ...canvasKit.Shader,
        MakeLinearGradient: makeItGc(
          canvasKit.Shader.MakeLinearGradient as any,
          garbages,
        ) as any,
      },
    },
    deleteGarbages,
    garbages,
  };
}

function makeItGc<T extends EmbindObject<any>, P extends unknown[]>(
  constructor: { new (...params: P): T },
  garbages: EmbindObject<any>[],
): {
  new (): T;
} {
  const prototype = constructor.prototype;
  const gcConstructor = function (this: T, ...params: P): T {
    const paint = new constructor(...params);
    garbages.push(paint);
    return paint;
  };
  gcConstructor.prototype = prototype;
  Object.keys(constructor).forEach((key) => {
    (gcConstructor as any)[key] = (constructor as any)[key];
  });

  return gcConstructor as any;
}
