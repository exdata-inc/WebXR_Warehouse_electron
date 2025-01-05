export type Bookmarks = Bookmark[];

export interface Bookmark {
  name: string;
  disp_mode: string;
  frame_step: number;
  interval_time: number;
  min_mode: boolean;
  label_mode: boolean;
  task_label: boolean;
  worker_mode: boolean;
  worker_disp: boolean;
  pallet_disp: boolean;
  ptrace_mode: boolean;
  pinfo_disp: boolean;
  pallet_info: any[];
  pstat_disp: boolean;
  pallet_stat: any[];
  min_frame: number;
  cur_frame: number;
  max_frame: number;
  select_id: number;
  select_pid: number;
  task_info: any[];
  use_video: boolean;
  small_panel: boolean;
}

export interface BookmarkSetFunctions {
  set_disp_mode?: (disp_mode: string) => void | undefined;
  set_frame_step?: (frame_step: number) => void | undefined;
  set_interval_time?: (interval_time: number) => void | undefined;
  set_min_mode?: (min_mode: boolean) => void | undefined;
  set_label_mode?: (label_mode: boolean) => void | undefined;
  set_task_label?: (task_label: boolean) => void | undefined;
  set_worker_mode?: (worker_mode: boolean) => void | undefined;
  set_worker_disp?: (worker_disp: boolean) => void | undefined;
  set_pallet_disp?: (pallet_disp: boolean) => void | undefined;
  set_ptrace_mode?: (ptrace_mode: boolean) => void | undefined;
  set_pinfo_disp?: (pinfo_disp: boolean) => void | undefined;
  set_pallet_info?: (pallet_info: any[]) => void | undefined;
  set_pstat_disp?: (pstat_disp: boolean) => void | undefined;
  set_pallet_stat?: (pallet_stat: any[]) => void | undefined;
  set_min_frame?: (min_frame: number) => void | undefined;
  set_cur_frame?: (cur_frame: number) => void | undefined;
  set_max_frame?: (max_frame: number) => void | undefined;
  set_select_id?: (select_id: number) => void | undefined;
  set_select_pid?: (select_pid: number) => void | undefined;
  set_task_info?: (task_info: any[]) => void | undefined;
  set_use_video?: (use_video: boolean) => void | undefined;
  set_small_panel?: (small_panel: boolean) => void | undefined;
}
