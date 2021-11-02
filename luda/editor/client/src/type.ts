import { FontWeight, Language, XywhRect } from "namui";

export type BaseClip = {
  /**
   * Special Ids
   * - Start with 'fake'
   *   - it's not a real clip.
   */
  id: string;
  startMs: number;
  endMs: number;
};

export type Clip = BaseClip | CameraClip | SubtitleClip;

export type CameraClip = BaseClip & {
  type: "camera";
  cameraAngle: CameraAngle;
};

export type CameraAngle = {
  imageSourceUrl: string;
  source01Rect: XywhRect;
  dest01Rect: XywhRect;
};

export type SubtitleClip = BaseClip & {
  type: "subtitle";
  subtitle: Subtitle;
};

export type Subtitle = {
  text: string;
  fontType: SubtitleFontType;
  style: SubtitleStyle;
};
export type SubtitleFontType = {
  serif: boolean;
  size: SubtitleFontSize;
  language: Language;
  fontWeight: FontWeight;
};
export type SubtitleStyle = {
  color: Float32Array;
  background: {
    color: Float32Array;
  };
  border: {
    color: Float32Array;
    width: number;
  };
  dropShadow: {
    x: number;
    y: number;
    color: Float32Array;
  };
};
export enum SubtitleFontSize {
  small = 24,
  regular = 48,
  large = 64,
}
