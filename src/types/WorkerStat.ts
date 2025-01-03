export type WorkerStats = WorkerStat[];

export interface WorkerStat {
  id: number;
  workTimes: WorkTimes;
  distance: number;
}

export interface WorkTimes {
  inspect: number;
  transport: number;
  sorting: number;
}
