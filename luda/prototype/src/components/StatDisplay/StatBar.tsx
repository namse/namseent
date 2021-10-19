import { Badge } from ".pnpm/@mui+material@5.0.4_3d4af7eb5b86aa12d9008f964c673b75/node_modules/@mui/material";
import { Typography, LinearProgress, Grid } from "@material-ui/core";
import {
  EmojiPeople,
  Face,
  FlashOn,
  Mic,
  ReportProblem,
} from "@material-ui/icons";
import React from "react";
import { StatState } from "../../store/State/StatState";

type StatBarProps = {
  label: keyof StatState;
  value: number;
  increment?: number;
  showFigure?: boolean;
};

const positiveStat: (keyof StatState)[] = ["vocal", "dance", "visual", "will"];

const statMaxLevel: Partial<Record<keyof StatState, number>> = {
  vocal: 20,
  dance: 20,
  visual: 20,
  will: 20,
};

const statIcon: Record<keyof StatState, JSX.Element> = {
  vocal: <Mic />,
  dance: <EmojiPeople />,
  visual: <Face />,
  stress: <ReportProblem />,
  will: <FlashOn />,
};

export default function StatBar(props: StatBarProps) {
  const { label, value, increment: increment_, showFigure } = props;

  const increment = increment_ || 0;
  const nextValue = value + increment;
  const maxLevel = statMaxLevel[label] || 1;
  const maxValue = 100 / maxLevel;
  const currentLevel = Math.floor(value / maxValue);
  const nextLevel = Math.floor((value + increment) / maxValue);
  const currentPercent = ((nextValue % maxValue) / maxValue) * 100;
  const incrementPercent = (increment / maxValue) * 100;

  const color = increment
    ? positiveStat.includes(label)
      ? increment > 0
        ? "primary"
        : "secondary"
      : increment < 0
      ? "primary"
      : "secondary"
    : undefined;

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item>
        <Badge
          badgeContent={
            nextLevel === currentLevel
              ? undefined
              : nextLevel > currentLevel
              ? "+"
              : "-"
          }
          color="primary"
          anchorOrigin={{ vertical: "top", horizontal: "left" }}
        >
          {statIcon[label]}
          <Typography variant="body2" color="textSecondary">
            {`${label} ${maxLevel !== 1 ? `Lv.${nextLevel}` : ""}`}
          </Typography>
        </Badge>
      </Grid>
      <Grid item xs>
        <LinearProgress
          color={color}
          variant="determinate"
          value={currentPercent}
        />
      </Grid>
      {showFigure ? (
        <Grid item>
          <Typography variant="body2" color="textSecondary">
            {currentPercent.toFixed(0)}%
          </Typography>
        </Grid>
      ) : undefined}
      {showFigure ? (
        <Grid item>
          <Typography variant="body2" color={color}>
            {increment
              ? `(${increment > 0 ? "+" : ""}${incrementPercent.toFixed(0)}%)${
                  increment > 0 ? "▲" : "▼"
                }`
              : undefined}
          </Typography>
        </Grid>
      ) : undefined}
    </Grid>
  );
}
