export type BoxInspSortArea = BoxInspSortAreaEntry[][];

export interface BoxInspSortAreaEntry {
  start: number;
  end: number;
  pallet_id: number;
  pallet_type: string;
  inspect_start?: number;
  inspect_end?: number;
}
