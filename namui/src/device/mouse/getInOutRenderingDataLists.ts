import { Vector, RenderingData, DrawCommand, RenderingTree } from "../../type";
import { visitRenderingTreeWithVector } from "./visitRenderingTree";

export type RenderingDataWithVector = {
  renderingData: RenderingData;
  translated: Vector;
};

export function getInOutRenderingDataLists(
  renderingTree: RenderingTree,
  vector: Vector,
): {
  in: RenderingDataWithVector[];
  out: RenderingDataWithVector[];
} {
  const vectorInRenderingDataList: RenderingDataWithVector[] = [];
  const vectorOutRenderingDataList: RenderingDataWithVector[] = [];

  visitRenderingTreeWithVector(renderingTree, vector, (node, localVector) => {
    if (!node || node instanceof Array || "type" in node) {
      return;
    }

    const renderingData: RenderingData = node;

    const listToPush = isVectorInRenderingData(renderingData, localVector)
      ? vectorInRenderingDataList
      : vectorOutRenderingDataList;

    listToPush.push({
      renderingData,
      translated: localVector,
    });
  });

  return {
    in: vectorInRenderingDataList,
    out: vectorOutRenderingDataList,
  };
}

function isVectorInRenderingData(
  renderingData: RenderingData,
  vector: Vector,
): boolean {
  return renderingData.drawCalls.some((drawCall) => {
    // TODO : Handle drawCall.clip
    return drawCall.commands.some((drawCommand) => {
      return isVectorInDrawCommand(drawCommand, vector);
    });
  });
}

function isVectorInDrawCommand(
  drawCommand: DrawCommand,
  vector: Vector,
): boolean {
  if ("path" in drawCommand) {
    const { paint } = drawCommand;
    const path = drawCommand.path.copy();
    try {
      if (path.contains(vector.x, vector.y)) {
        return true;
      }

      const stroked = path.stroke({
        cap: paint.getStrokeCap(),
        join: paint.getStrokeJoin(),
        width: paint.getStrokeWidth(),
        miter_limit: paint.getStrokeMiter(),
      });
      // NOTE : I'm not sure this is right way to handle stroke information of paint.
      if (!stroked) {
        return false;
      }
      const result = stroked.contains(vector.x, vector.y);
      return result;
    } finally {
      path?.delete();
    }
  }

  console.debug(
    "this type of drawCommand is not supported yet for checking vector being in",
    drawCommand,
  );
  return false;
}
