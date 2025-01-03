export type FrameBasedEntities = Frame[];

export interface Frame {
  frame_id: number;
  tracks: Track[];
}

export interface Track {
  track_id: number;
  bbox: number[];
}
