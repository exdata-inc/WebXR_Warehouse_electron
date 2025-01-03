export type PalletTraces = PalletTrace[];

export interface PalletTrace {
  id: number;
  start: number;
  end: number;
  points: number[][];
}
