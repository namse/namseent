import {
  Table,
  TableBody,
} from ".pnpm/@mui+material@5.0.4_3d4af7eb5b86aa12d9008f964c673b75/node_modules/@mui/material";
import { Container } from "@material-ui/core";
import React from "react";
import { StatState } from "../../store/State/StatState";
import useStore from "../../store/useStore";
import StatBar from "./StatBar";

type StatDisplayProps = {
  increment?: Partial<StatState>;
  showChangedOnly?: boolean;
  showFigure?: boolean;
};

export default function StatDisplay(props: StatDisplayProps) {
  const { increment, showChangedOnly, showFigure } = props;
  const [state, update] = useStore();
  const { stat } = state;
  return (
    <Container disableGutters>
      <Table padding="checkbox">
        <TableBody>
          {Object.entries(stat).map(([key_, value]) => {
            const key = key_ as keyof typeof stat;
            const statIncrement = (increment || {})[key];
            return showChangedOnly && !statIncrement ? undefined : (
              <StatBar
                label={key}
                value={value}
                increment={statIncrement}
                showFigure={showFigure}
                key={`stat-${key}`}
              />
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
}
