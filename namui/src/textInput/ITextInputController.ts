export interface ITextInputController {
  updateSelection(selection: Selection | undefined): void;
  setFocus(text: string, onChange: OnTextInputChange): void;
  outFocus(): void;
}

// NOTE : Not same with Web's Selection. start would be greater than end.
export type Selection = {
  start: number;
  end: number;
};

export type OnTextInputChange = (event: {
  text: string;
  selection?: Selection;
}) => void;
