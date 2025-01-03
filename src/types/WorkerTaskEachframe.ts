export type WorkerTaskEachframes = WorkerTaskEachframe[][];

export interface WorkerTaskEachframe {
  start: number;
  end: number;
  label: number;
}
