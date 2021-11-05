import { Render, RenderingTree } from "namui";
import { renderCameraAngleEditor } from "./cameraAngleEditor/renderCameraAngleEditor";
import { CameraAngleEditorState } from "./cameraAngleEditor/type";
import { isCameraClip } from "./clipTypeGuard";
import { ImageEditorState } from "./imageEditor/type";
import { SubtitleEditorState } from "./subtitleEditor/type";
import { Timeline } from "./timeline/Timeline";
import { TimelineState } from "./timeline/type";

type State = {
  imageEditorState: ImageEditorState;
  timelineState: TimelineState;
  cameraAngleEditorState: CameraAngleEditorState;
  subtitleEditorState: SubtitleEditorState;
};

export function render(state: State): RenderingTree {
  return [ClipEditor(state), Timeline(state.timelineState)];
}

const ClipEditor: Render<State> = (state) => {
  const { selectedClip } = state.timelineState;
  if (!selectedClip) {
    return;
  }

  if (isCameraClip(selectedClip)) {
    state.cameraAngleEditorState.cameraAngle = selectedClip.cameraAngle;
    return renderCameraAngleEditor(state.cameraAngleEditorState);
  }

  return;
};
