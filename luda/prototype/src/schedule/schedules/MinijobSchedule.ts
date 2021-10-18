import { State } from "../../store/State";
import BaseSchedule from "./BaseSchedule";
import error from "../../../public/image/error.png";
import { StatState } from "../../store/State/StatState";
import constrain from "../../util/constrain";

type MinijobScheduleProps = {
  name?: string;
  duration?: number;
  editable?: boolean;
  subtype: MinijobType;
};

export const minijobTypes = [
  "mascotSuit",
  "weddingSong",
  "event",
  "fittingModel",
] as const;

export type MinijobType = typeof minijobTypes[number];

export default class MinijobSchedule extends BaseSchedule {
  readonly type = "minijob";
  name: string;
  duration: number;
  editable: boolean;
  subtype: MinijobType;
  thumbnail = error;
  obtains: { success: boolean; increment: Partial<StatState> }[] = [];
  successRate: number = 0;

  constructor(props: MinijobScheduleProps) {
    super();
    this.name = props.name ?? "아르바이트";
    this.duration = props.duration ?? 1;
    this.editable = props.editable ?? true;
    this.subtype = props.subtype;
  }

  startSchedule(state: State): void {
    const { stat, ui } = state;
    const step = 6;
    const stepFactor = 1 / step;
    for (let i = 0; i < step; i++) {
      const success = this.didSucceed(stat);
      this.successRate += success ? 1 : 0;

      const obtain: MinijobSchedule["obtains"][number] = {
        success,
        increment: {},
      };
      const { increment } = obtain;
      // TODO: earn money
      switch (this.subtype) {
        case "mascotSuit": {
          increment.dance = 0.25 * (success ? 1 : 0.25) * stepFactor;
          increment.visual = -0.5 * (success ? 0.75 : 1) * stepFactor;
          increment.will = -1 * (success ? 0.75 : 1) * stepFactor;
          increment.stress = 45 * (success ? 0.75 : 1) * stepFactor;
          break;
        }
        case "weddingSong": {
          increment.vocal = 0.5 * (success ? 1 : 0.25) * stepFactor;
          increment.will = -0.5 * (success ? 0.75 : 1) * stepFactor;
          increment.stress = 30 * (success ? 0.75 : 1) * stepFactor;
          break;
        }
        case "event": {
          increment.will = -0.75 * (success ? 0.75 : 1) * stepFactor;
          increment.stress = 35 * (success ? 0.75 : 1) * stepFactor;
          break;
        }
        default: {
          increment.visual = 0.5 * (success ? 1 : 0.25) * stepFactor;
          increment.will = -0.5 * (success ? 0.75 : 1) * stepFactor;
          increment.stress = 30 * (success ? 0.75 : 1) * stepFactor;
          break;
        }
      }
      this.obtains.push(obtain);
    }
    ui.minijobWindow = true;
  }

  endSchedule(state: State): void {
    state.ui.minijobWindow = false;
  }

  clone() {
    const newInstance = new MinijobSchedule({
      name: this.name,
      subtype: this.subtype,
    });
    newInstance.duration = this.duration;
    newInstance.editable = this.editable;
    return newInstance;
  }

  didSucceed(stat: StatState) {
    const { stress, will } = stat;
    const stressFactor = constrain((100 - stress + 25) / 100);
    return Math.random() < stressFactor / 2 + will / 100 / 2;
  }
}
