import { RenderingTree } from "../../..";
import { Vector } from "../../../type";
import { IManagerInternal } from "../../IManager";
import { getInOutRenderingDataLists } from "../getInOutRenderingDataLists";
import { IMousePositionManager } from "./IMousePositionManager";

export abstract class BaseMousePositionManager
  implements IMousePositionManager, IManagerInternal
{
  public mousePosition: Vector = new Vector(0, 0);
  afterRender(renderingTree: RenderingTree) {
    const { in: inRenderingDataAndVectorList } = getInOutRenderingDataLists(
      renderingTree,
      this.mousePosition,
    );

    inRenderingDataAndVectorList.forEach((renderingDataAndVector) => {
      renderingDataAndVector.renderingData.onMouseIn?.();
    });
  }
}
