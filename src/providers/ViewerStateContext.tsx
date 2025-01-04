import React, { ReactElement } from 'react';
import { StaticImageData } from 'next/image';
import JSZip from 'jszip';

import type { BoxInspSortArea } from '@/types/BoxInspSortArea';
import type { FrameBasedEntities } from '@/types/FrameBasedEntities';
import type { PalletTraces } from '@/types/PalletTrace';
import type { BoxInfos } from '@/types/BoxInfo';
import type { WorkerStats } from '@/types/WorkerStat';
import type { WorkerTaskEachframes } from '@/types/WorkerTaskEachframe';

import defaultImage from '@public/stitched_20241106105031.jpg';
import defaultBoxInspSortArea from '@public/box_insp_sort_area_07-12.json';
import defaultFrameBasedPallets from '@public/frame_based_pallet_1110.json';
import defaultFrameBasedWorkers from '@public/frame_based_worker_1110.json';
import defaultPalletTraces from '@public/pallet_trace_20241003_1100-1130.json';
import defaultBoxInfos from '@public/ptokai_box_info.json';
import defaultWorkerStats from '@public/worker_stat_20241003_11.json';
import defaultWorkerTaskEachframes from '@public/worker_task_eachframe_20241003_11.json';

export type ViewerStateContextType = {
  floorImage: StaticImageData;
  setFloorImage: (floorImage: string | StaticImageData | File) => void;
  boxInspSortArea: BoxInspSortArea;
  setBoxInspSortArea: (boxInspSortArea: string | BoxInspSortArea | File) => void;
  frameBasedPallets: FrameBasedEntities;
  setFrameBasedPallets: (frameBasedPallet: string | FrameBasedEntities | File) => void;
  frameBasedWorkers: FrameBasedEntities;
  setFrameBasedWorkers: (frameBasedWorkers: string | FrameBasedEntities | File) => void;
  palletTraces: PalletTraces;
  setPalletTraces: (palletTraces: string | PalletTraces | File) => void;
  boxInfos: BoxInfos;
  setBoxInfos: (boxInfos: string | BoxInfos | File) => void;
  workerStats: WorkerStats;
  setWorkerStats: (workerStats: string | WorkerStats | File) => void;
  workerTaskEachframes: WorkerTaskEachframes;
  setWorkerTaskEachframes: (workerTaskEachframes: string | WorkerTaskEachframes | File) => void;
  saveData: () => void;
  loadData: () => void;
};

const ViewerStateContext = React.createContext<ViewerStateContextType>(
  {} as ViewerStateContextType,
);

export const useViewerStateContext = (): ViewerStateContextType => {
  return React.useContext<ViewerStateContextType>(ViewerStateContext);
};

type Props = {
  children: React.ReactNode;
};

export const ViewerStateProvider = (props: Props): ReactElement => {

  const [floorImage, setFloorImageData] = React.useState<StaticImageData>(defaultImage);
  const setFloorImage = (floorImage: string | StaticImageData | File): void => {
    if (typeof floorImage === 'string') {
      setFloorImageData({ src: floorImage, height: 0, width: 0 });
    } else if (floorImage instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFloorImageData({ src: e.target?.result as string, height: 0, width: 0 });
      };
      reader.readAsDataURL(floorImage);
    } else {
      setFloorImageData(floorImage);
    }
  }

  const [boxInspSortArea, setBoxInspSortAreaData] = React.useState<BoxInspSortArea>(defaultBoxInspSortArea as BoxInspSortArea);
  const setBoxInspSortArea = (boxInspSortArea: string | BoxInspSortArea | File): void => {
    if (typeof boxInspSortArea === 'string') {
      // JSON 文字列か確認
      try {
        const parsedData = JSON.parse(boxInspSortArea);
        setBoxInspSortAreaData(parsedData);
      } catch (error) {
        fetch(boxInspSortArea)
          .then((response) => response.json())
          .then((data) => setBoxInspSortAreaData(data))
          .catch((err) => console.error('Failed to fetch or parse data from URL:', err));
      }
    } else if (boxInspSortArea instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBoxInspSortAreaData(JSON.parse(e.target?.result as string));
      };
      reader.readAsText(boxInspSortArea);
    } else {
      setBoxInspSortAreaData(boxInspSortArea);
    }
  }

  const [frameBasedPallets, setFrameBasedPalletsData] = React.useState<FrameBasedEntities>(defaultFrameBasedPallets as FrameBasedEntities);
  const setFrameBasedPallets = (frameBasedPallet: string | FrameBasedEntities | File): void => {
    if (typeof frameBasedPallet === 'string') {
      // JSON 文字列か確認
      try {
        const parsedData = JSON.parse(frameBasedPallet);
        setFrameBasedPalletsData(parsedData);
      } catch (error) {
        fetch(frameBasedPallet)
          .then((response) => response.json())
          .then((data) => setFrameBasedPalletsData(data))
          .catch((err) => console.error('Failed to fetch or parse data from URL:', err));
      }
    } else if (frameBasedPallet instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFrameBasedPalletsData(JSON.parse(e.target?.result as string));
      };
      reader.readAsText(frameBasedPallet);
    } else {
      setFrameBasedPalletsData(frameBasedPallet);
    }
  }

  const [frameBasedWorkers, setFrameBasedWorkersData] = React.useState<FrameBasedEntities>(defaultFrameBasedWorkers as FrameBasedEntities);
  const setFrameBasedWorkers = (frameBasedWorkers: string | FrameBasedEntities | File): void => {
    if (typeof frameBasedWorkers === 'string') {
      // JSON 文字列か確認
      try {
        const parsedData = JSON.parse(frameBasedWorkers);
        setFrameBasedWorkersData(parsedData);
      } catch (error) {
        fetch(frameBasedWorkers)
          .then((response) => response.json())
          .then((data) => setFrameBasedWorkersData(data))
          .catch((err) => console.error('Failed to fetch or parse data from URL:', err));
      }
    } else if (frameBasedWorkers instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFrameBasedWorkersData(JSON.parse(e.target?.result as string));
      };
      reader.readAsText(frameBasedWorkers);
    } else {
      setFrameBasedWorkersData(frameBasedWorkers);
    }
  }

  const [palletTraces, setPalletTracesData] = React.useState<PalletTraces>(defaultPalletTraces as PalletTraces);
  const setPalletTraces = (palletTraces: string | PalletTraces | File): void => {
    if (typeof palletTraces === 'string') {
      // JSON 文字列か確認
      try {
        const parsedData = JSON.parse(palletTraces);
        setPalletTracesData(parsedData);
      } catch (error) {
        fetch(palletTraces)
          .then((response) => response.json())
          .then((data) => setPalletTracesData(data))
          .catch((err) => console.error('Failed to fetch or parse data from URL:', err));
      }
    } else if (palletTraces instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPalletTracesData(JSON.parse(e.target?.result as string));
      };
      reader.readAsText(palletTraces);
    } else {
      setPalletTracesData(palletTraces);
    }
  }

  const [boxInfos, setBoxInfosData] = React.useState<BoxInfos>(defaultBoxInfos as BoxInfos);
  const setBoxInfos = (boxInfos: string | BoxInfos | File): void => {
    if (typeof boxInfos === 'string') {
      // JSON 文字列か確認
      try {
        const parsedData = JSON.parse(boxInfos);
        setBoxInfosData(parsedData);
      } catch (error) {
        fetch(boxInfos)
          .then((response) => response.json())
          .then((data) => setBoxInfosData(data))
          .catch((err) => console.error('Failed to fetch or parse data from URL:', err));
      }
    } else if (boxInfos instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBoxInfosData(JSON.parse(e.target?.result as string));
      };
      reader.readAsText(boxInfos);
    } else {
      setBoxInfosData(boxInfos);
    }
  }

  const [workerStats, setWorkerStatsData] = React.useState<WorkerStats>(defaultWorkerStats as WorkerStats);
  const setWorkerStats = (workerStats: string | WorkerStats | File): void => {
    if (typeof workerStats === 'string') {
      // JSON 文字列か確認
      try {
        const parsedData = JSON.parse(workerStats);
        setWorkerStatsData(parsedData);
      } catch (error) {
        fetch(workerStats)
          .then((response) => response.json())
          .then((data) => setWorkerStatsData(data))
          .catch((err) => console.error('Failed to fetch or parse data from URL:', err));
      }
    } else if (workerStats instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setWorkerStatsData(JSON.parse(e.target?.result as string));
      };
      reader.readAsText(workerStats);
    } else {
      setWorkerStatsData(workerStats);
    }
  }

  const [workerTaskEachframes, setWorkerTaskEachframesData] = React.useState<WorkerTaskEachframes>(defaultWorkerTaskEachframes as WorkerTaskEachframes);
  const setWorkerTaskEachframes = (workerTaskEachframes: string | WorkerTaskEachframes | File): void => {
    if (typeof workerTaskEachframes === 'string') {
      // JSON 文字列か確認
      try {
        const parsedData = JSON.parse(workerTaskEachframes);
        setWorkerTaskEachframesData(parsedData);
      } catch (error) {
        fetch(workerTaskEachframes)
          .then((response) => response.json())
          .then((data) => setWorkerTaskEachframesData(data))
          .catch((err) => console.error('Failed to fetch or parse data from URL:', err));
      }
    } else if (workerTaskEachframes instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setWorkerTaskEachframesData(JSON.parse(e.target?.result as string));
      };
      reader.readAsText(workerTaskEachframes);
    } else {
      setWorkerTaskEachframesData(workerTaskEachframes);
    }
  }

  const saveData = async (): Promise<void> => {
    const zip = new JSZip();
  
    // 画像を追加
    const floorImageBlob = await fetch(floorImage.src).then((response) => response.blob());
    zip.file(`floorImage.${floorImageBlob.type.split('/')[1]}`, floorImageBlob);

    // オブジェクトをそれぞれ JSON ファイルとして追加
    const objects = {
      boxInspSortArea,
      frameBasedPallets,
      frameBasedWorkers,
      palletTraces,
      boxInfos,
      workerStats,
      workerTaskEachframes,
    };
  
    for (const [key, value] of Object.entries(objects)) {
      const json = JSON.stringify(value, null, 2); // 整形された JSON
      zip.file(`${key}.json`, json);
    }
  
    // ZIP ファイルを生成
    const zipBlob = await zip.generateAsync({ type: 'blob' });
  
    // 現在時刻をファイル名に含める
    const now = new Date();
    const formattedTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}-${String(now.getSeconds()).padStart(2, '0')}`;

    // ZIP ファイルをダウンロード
    const a = document.createElement('a');
    const url = URL.createObjectURL(zipBlob);
    a.href = url;
    a.download = `webxr_warehouse_${formattedTime}.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadData = async (): Promise<void> => {
    // ファイル選択ダイアログを開く
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.zip';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const zip = new JSZip();
        await zip.loadAsync(file);
  
        // 画像を読み込む
        const floorImageBlobs = zip.file(/floorImage./);
        if (floorImageBlobs) {
          const floorImageBlob = await floorImageBlobs[0].async('blob');
          const reader = new FileReader();
          reader.onload = async () => {
            const imageUrl = reader.result as string;
            // 画像の幅と高さを取得
            const image = new Image();
            image.src = imageUrl;
            image.onload = () => {
              setFloorImageData({ src: imageUrl, height: image.height, width: image.width });
            };
          };
          reader.readAsDataURL(floorImageBlob);
        }
  
        // オブジェクトをそれぞれ読み込む
        const objects = {
          boxInspSortArea,
          frameBasedPallets,
          frameBasedWorkers,
          palletTraces,
          boxInfos,
          workerStats,
          workerTaskEachframes,
        };
  
        for (const [key, value] of Object.entries(objects)) {
          const json = await zip.file(`${key}.json`)?.async('text');
          if (json) {
            const parsedData = JSON.parse(json);
            switch (key) {
              case 'boxInspSortArea':
                setBoxInspSortAreaData(parsedData);
                break;
              case 'frameBasedPallets':
                setFrameBasedPalletsData(parsedData);
                break;
              case 'frameBasedWorkers':
                setFrameBasedWorkersData(parsedData);
                break;
              case 'palletTraces':
                setPalletTracesData(parsedData);
                break;
              case 'boxInfos':
                setBoxInfosData(parsedData);
                break;
              case 'workerStats':
                setWorkerStatsData(parsedData);
                break;
              case 'workerTaskEachframes':
                setWorkerTaskEachframesData(parsedData);
                break;
              default:
                break;
            }
          }
        }
      }
    };
    input.click();
  }

  const value: ViewerStateContextType = {
    floorImage,
    setFloorImage,
    boxInspSortArea,
    setBoxInspSortArea,
    frameBasedPallets,
    setFrameBasedPallets,
    frameBasedWorkers,
    setFrameBasedWorkers,
    palletTraces,
    setPalletTraces,
    boxInfos,
    setBoxInfos,
    workerStats,
    setWorkerStats,
    workerTaskEachframes,
    setWorkerTaskEachframes,
    saveData,
    loadData,
  };
  return <ViewerStateContext.Provider value={value}>{props.children}</ViewerStateContext.Provider>;
};

export default ViewerStateProvider;
