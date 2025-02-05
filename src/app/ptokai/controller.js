"use client";
import * as React from 'react'
import { useRouter } from 'next/navigation';

import "./controller.css";
import WorkerStats from '../../components/WorkerStats';
import PalletStats from '../../components/PalletStats';
import { useBookmarkContext } from '@/providers/BookmarkContext';

export default function Controller(props) {
  const {min_frame} = props
  const {cur_frame, max_frame, set_cur_frame, set_max_frame} = props
  const {disp_mode, set_disp_mode, frame_step, set_frame_step} = props
  const {ptrace_mode, set_ptrace_mode} = props;
  const {label_mode, set_label_mode, worker_mode,set_worker_mode, task_label, set_task_label} = props;
  const {worker_disp, set_worker_disp, worker_stat, set_worker_stat} = props;
  const {select_id,set_select_id,select_pid, set_select_pid, pstat_disp, set_pstat_disp} = props;
  const {pallet_stat} = props;
  const {min_mode, set_min_mode, interval_time, set_interval_time} = props;
  const {pinfo_disp, set_pinfo_disp,pallet_info, set_pallet_info} = props;
  const {set_use_video, use_video} = props;
  const {pallet_disp, set_pallet_disp}= props;
  const {small_panel, set_small_panel}=props;
  const router = useRouter();

  const { bookmarks, addBookmark, deleteBookmark, applyBookmark } = useBookmarkContext();

  const on_set_cur_frame = (e)=>{
    let value = Number.parseFloat(e.target.value || 0)
    props.set_cur_frame(value)
  }

  const on_set_frame_step = (e)=>{
    let value = Number.parseFloat(e.target.value || 0)
//
    set_frame_step(value);
  }

  const on_set_interval_time = (e)=>{
    let value = Number.parseFloat(e.target.value || 0)
//
    set_interval_time(value);
  }


  const change_disp_mode  = ()=>{
    console.log("Disp-mode:", disp_mode)
    if (disp_mode == "None") {
      set_disp_mode("3D")
    } else {
      set_disp_mode("None")
    }   
  }
  
  const change_ptrace_mode  = (e)=>{
    console.log("Ptrace-mode:", e.target.checked)
    set_ptrace_mode(e.target.checked);
  }

  const change_small_panel  = (e)=>{
    set_small_panel(e.target.checked);
  }
  const change_label_mode  = (e)=>{
    set_label_mode(e.target.checked);
  }

  const change_task_label  = (e)=>{
    set_task_label(e.target.checked);
  }
  const change_worker_mode  = (e)=>{
    set_worker_mode(e.target.checked);
  }

  const change_worker_disp  = (e)=>{
    set_worker_disp(e.target.checked);
  }

  const change_pstat_disp  = (e)=>{
    set_pstat_disp(e.target.checked);
  }
  const change_pinfo_disp  = (e)=>{
    set_pinfo_disp(e.target.checked);
  }

  const change_min_mode  = (e)=>{
    set_min_mode(e.target.checked);
  }
  
  const change_use_video  = (e)=>{
    set_use_video(e.target.checked);
  }

  const change_pallet_disp = (e)=>{
    set_pallet_disp(e.target.checked);
  }

  const frame_to_time = (frame) => {
    let sec = frame / 2.5;
    let hour = Math.floor(sec / 3600);
    sec -= hour * 3600;
    let min = Math.floor(sec / 60);
    sec -= min * 60;
    sec = Math.floor(sec*10)/10;
    hour += 7; // default offset
    // 2桁になるようにゼロパディング
    const hourStr = String(hour).padStart(2, '0');
    const minStr = String(min).padStart(2, '0');
    const secStr = String(sec.toFixed(1)).padStart(4, '0'); // 小数点を含むため4桁に調整

    return `${hourStr}:${minStr}:${secStr} / `+frame+":"+frame_step;
  }

  const handleAddBookmark = () =>{
    const now = new Date();
    const formattedTime = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    addBookmark({
      name: formattedTime,
      disp_mode: disp_mode,
      frame_step: frame_step,
      interval_time: interval_time,
      min_mode: min_mode,
      label_mode: label_mode,
      task_label: task_label,
      worker_mode: worker_mode,
      worker_disp: worker_disp,
      pallet_disp: pallet_disp,
      ptrace_mode: ptrace_mode,
      pinfo_disp: pinfo_disp,
      pallet_info: pallet_info,
      pstat_disp: pstat_disp,
      pallet_stat: pallet_stat,
      min_frame: min_frame,
      cur_frame: cur_frame,
      max_frame: max_frame,
      select_id: select_id,
      select_pid: select_pid,
      task_info: [],
      use_video: use_video,
      small_panel: small_panel,
    });
  }

  return (
    <>

      <div className="controller" >
        <div className="row mb-0">
          <div className="col-md-4"><label htmlFor="frame_time" className="form-label"><span className="form-control-plaintext">現在時刻　　　</span></label>
          <label><input type="checkbox" className="form-center-control" id="ctlpnl" checked={small_panel} onChange={change_small_panel}/> Hide </label>
          </div>
          <div className="col-md-2"><input type="string" className="form-center-control" id="frame_time" value={frame_to_time(cur_frame)} readOnly/></div>
        </div>
        {(!small_panel)?
        <div className="row mb-0">
          <div className="col-md-4"><label htmlFor="disp_mode" className="form-label"><span className="form-control-plaintext">表示オプション</span></label></div>
          <div className="col-md-2">
            <label><input type="checkbox" className="form-center-control" id="worker_mode" checked={worker_mode} onChange={change_worker_mode}/> Worker  </label> 
            <label><input type="checkbox" className="form-center-control" id="clabel_mode" checked={label_mode} onChange={change_label_mode}/> Label </label> 
            <label><input type="checkbox" className="form-center-control" id="label_mode" checked={task_label} onChange={change_task_label}/> Task</label> 
            <br/>
            <label><input type="checkbox" className="form-center-control" id="label_work" checked={worker_disp} onChange={change_worker_disp}/> Stats</label>
          </div>
          <div className="col-md-2">
            <label><input type="checkbox" className="form-center-control" id="pt" checked={pallet_disp} onChange={change_pallet_disp}/> Pallet </label>
            <label><input type="checkbox" className="form-center-control" id="pt" checked={ptrace_mode} onChange={change_ptrace_mode}/> Trace  </label>
            <label><input type="checkbox" className="form-center-control" id="pinfo" checked={pinfo_disp} onChange={change_pinfo_disp}/> Info</label>
            <br/>
            <label><input type="checkbox" className="form-center-control" id="pstats" checked={pstat_disp} onChange={change_pstat_disp}/> PalStats </label>
            <label><input type="checkbox" className="form-center-control" id="disp_mode" onChange={change_disp_mode}/> Stack </label>
          </div>
          <div className="col-md-2">
          <div className="col-md-4"><label htmlFor="disp_mode" className="form-label"><span className="form-control-plaintext">再生関係</span></label></div>
          <label><input type="checkbox" className="form-center-control" id="vd" checked={use_video} onChange={change_use_video}/> 動画  </label>
          <label><input type="checkbox" className="form-center-control" id="min" checked={min_mode} onChange={change_min_mode}/> 11:00~  </label>
          <div className="col-md-4"><label htmlFor="disp_mode" className="form-label"><span className="form-control-plaintext">ブックマーク</span></label></div>
          <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-0.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleAddBookmark}>現在の状態を追加</button>
          {bookmarks.map((bookmark, index) => (
            <div className='flex' key={index}>
              <button type="button" class="py-0.5 px-2 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" key={index} onClick={() => applyBookmark(bookmark)}>{bookmark.name}</button>
              <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-0.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" key={index} onClick={() => deleteBookmark(index)}>消</button>
            </div>
          ))}
          <button type="button" class="py-0.5 px-2 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700" key={'prev-page'} onClick={() => router.push('/')}>戻る</button>
          </div>
        </div>:<></>
        }

      </div>
      
      { 
      (worker_disp)? 
      <div className="worker-list" >
        <WorkerStats workers={worker_stat} set_select_id={set_select_id} select_id={select_id}/>
      </div>
      : <></>      
      }

      {
        (pstat_disp)?(
         (worker_disp)?
          <div className="pstat-center-list" >
            <PalletStats pallets={pallet_stat} set_select_pid={set_select_pid} select_pid={select_pid}/>
         </div>:
          <div className="pstat-list" >
            <PalletStats pallets={pallet_stat} set_select_pid={set_select_pid} select_pid={select_pid}/>
        </div>):
        <></>
      }

      <div className="frame-controller" >
        <div className="row mb-0">
          <div className="col-md-12">
            <input type="range" value={cur_frame} min={min_frame} max={max_frame} step={1} onChange={on_set_cur_frame}
                className="xr-input-range" id="frame" />
           </div>
          </div>
          <div className="col-md-12">
            <input type="range" value={frame_step} min={1} max={200} step={1} width={500} onChange={on_set_frame_step}
                className="xr-input-range-sm" id="frame" />
                 
            <input type="range" value={interval_time} min={20} max={400} step={1} width={300} onChange={on_set_interval_time}
                className="xr-input-range-sm2" id="frame" />
          </div>
      </div>

    </>
    )
}
