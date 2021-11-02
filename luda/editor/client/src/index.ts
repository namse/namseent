import { ColorUtil, FontWeight, Language, startEngine } from "namui";
import { render } from "./render";

startEngine(
  {
    imageEditorState: {
      imageUrls: [],
    },
    timelineState: {
      layout: {
        x: 100,
        y: 100,
        width: 1000,
        height: 600,
        headerWidth: 200,
        msPerPixel: 100,
        startMs: 0,
      },
      tracks: [
        {
          id: "track1",
          clips: [
            {
              id: "1-1",
              startMs: 0,
              endMs: 1000,
            },
            {
              id: "1-2",
              startMs: 1000,
              endMs: 2000,
            },
            {
              id: "1-3",
              startMs: 3000,
              endMs: 4000,
            },
          ],
        },
        {
          id: "track2",
          clips: [
            {
              id: "2-1",
              startMs: 2500,
              endMs: 3500,
            },
          ],
        },
      ],
    },
    cameraAngleEditorState: {
      layout: {
        rect: {
          x: 100,
          y: 100,
          width: 800,
          height: 800,
        },
        sub: {
          wysiwygEditor: {
            x: 400,
            y: 0,
            width: 400,
            height: (400 / 16) * 9,
          },
          preview: {
            x: 400,
            y: 400,
            width: 400,
            height: (400 / 16) * 9,
          },
        },
      },
      cameraAngle: {
        imageSourceUrl: "resources/images/피디-기본-미소.png",
        source01Rect: {
          x: 0.25,
          y: 0.25,
          width: 0,
          height: 0.5,
        },
        dest01Rect: {
          x: 0,
          y: 0,
          width: 1,
          height: 1,
        },
      },
      propertyTextEditor: {
        textInput: {
          targetId: undefined,
        },
      },
      wysiwygEditor: {
        resizer: {},
      },
    },
    subtitleEditorState: {
      layout: {
        rect: {
          x: 100,
          y: 100,
          width: 400,
          height: 800,
        },
        videoSize: {
          width: 1280,
          height: 720,
        },
      },
      textInput: {},
      subtitle: {
        text: "[여기에 텍스트 입력]",
        fontType: {
          serif: false,
          size: 24,
          language: Language.ko,
          fontWeight: FontWeight.regular,
        },
        style: {
          color: ColorUtil.White,
          background: {
            color: ColorUtil.Black,
          },
          border: {
            color: ColorUtil.Transparent,
            width: 1,
          },
          dropShadow: {
            x: 1,
            y: 1,
            color: ColorUtil.Transparent,
          },
        },
      },
      colorInput: {
        targetId: undefined,
        hue: 0,
        saturation: 0,
        lightness: 0,
        alpha: 1,
      },
    },
  },
  render,
  {
    hotReload: {
      buildServerUrl: "ws://localhost:8080",
    },
  },
);
