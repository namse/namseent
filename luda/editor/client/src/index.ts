import { ColorUtil, FontWeight, Language, startEngine } from "namui";
import { nanoid } from "nanoid";
import { getDefaultSyncBrowserItemsState } from "./cameraAngleEditor/imageBrowser/SyncBrowserItems";
import { render } from "./render";
import { createClip } from "./timeline/operations/createClip";
import { TrackType } from "./timeline/type";

startEngine(
  {
    imageEditorState: {
      imageUrls: [],
    },
    timelineState: {
      layout: {
        x: 0,
        y: window.innerHeight - 200,
        width: window.innerWidth,
        height: 200,
        headerWidth: 200,
        msPerPixel: 100,
        startMs: 0,
        timeRulerHeight: 20,
      },
      timelineBorderId: nanoid(),
      tracks: [
        {
          id: "track1",
          type: TrackType.camera,
          clips: [
            createClip({
              trackType: TrackType.camera,
              id: nanoid(),
              startMs: 0,
              endMs: 1000,
            }),
            createClip({
              trackType: TrackType.camera,
              id: nanoid(),
              startMs: 1000,
              endMs: 3000,
            }),
            createClip({
              trackType: TrackType.camera,
              id: nanoid(),
              startMs: 3000,
              endMs: 7000,
            }),
          ],
        },
      ],
    },
    cameraAngleEditorState: {
      layout: {
        rect: {
          x: 0,
          y: 0,
          width: 800,
          height: window.innerHeight - 200,
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
      imageBrowser: {
        directoryKey: "",
        layout: {
          x: 0,
          y: 0,
          width: 200,
          height: window.innerHeight - 200,
          currentDirectoryLabel: {
            x: 20,
            y: 20,
            width: 160,
            height: 40,
          },
        },
        syncBrowserItems: getDefaultSyncBrowserItemsState(),
        imageFilenameObjects: [],
        scrollState: {
          scrollY: 0,
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
    livePlayer: {
      layout: {
        x: 800,
        y: 0,
        width: window.innerWidth - 800,
        height: window.innerHeight - 200,
      },
      state: {
        isPlaying: false,
        anchorMs: 0,
        playStartTimeMs: 0,
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
