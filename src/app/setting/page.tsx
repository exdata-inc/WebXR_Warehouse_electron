
"use client";

import * as React from 'react'
import { useRouter } from 'next/navigation';
import { StaticImageData } from 'next/image';
//import 'aframe';

import { useViewerStateContext } from '@/providers/ViewerStateContext';
import { Button, Content, defaultTheme, DropZone, Flex, Heading, IllustratedMessage, Provider, View, Text } from '@adobe/react-spectrum';
import { FileTrigger } from 'react-aria-components';
import { BoxInfos } from '@/types/BoxInfo';
import { BoxInspSortArea } from '@/types/BoxInspSortArea';
import { FrameBasedEntities } from '@/types/FrameBasedEntities';
import { PalletTraces } from '@/types/PalletTrace';
import { WorkerStats } from '@/types/WorkerStat';
import { WorkerTaskEachframes } from '@/types/WorkerTaskEachframe';




export default function Page() {
  const router = useRouter();
  const {
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
  } = useViewerStateContext();

  const FILE_ENTRIES = [
    { label: "床画像", value: floorImage, setState: setFloorImage, acceptTypes: ['image/jpeg', 'image/png'] },
    { label: "Box Inspection Sort Area", value: boxInspSortArea, setState: setBoxInspSortArea, acceptTypes: ['application/json'] },
    { label: "Frame-Based Pallets", value: frameBasedPallets, setState: setFrameBasedPallets, acceptTypes: ['application/json'] },
    { label: "Frame-Based Workers", value: frameBasedWorkers, setState: setFrameBasedWorkers, acceptTypes: ['application/json'] },
    { label: "Pallet Traces", value: palletTraces, setState: setPalletTraces, acceptTypes: ['application/json'] },
    { label: "Box Infos", value: boxInfos, setState: setBoxInfos, acceptTypes: ['application/json'] },
    { label: "Worker Stats", value: workerStats, setState: setWorkerStats, acceptTypes: ['application/json'] },
    { label: "Worker Task Each Frames", value: workerTaskEachframes, setState: setWorkerTaskEachframes, acceptTypes: ['application/json'] },
  ];

  // ローカルファイル選択ハンドラ
  const handleFileUpload = (
    file: File | null,
    setState: (value: string | object | File) => void,
  ) => {
    if (file) {
      setState(file);
    }
  };

  return (
    <Provider theme={defaultTheme}>
      <View padding={32} height={'100vh'} overflow={'auto'}>
        <Flex direction="column">
          <Flex direction="row" alignItems="center">
            <h1 className="text-4xl font-extrabold">設定</h1>
            <View width={32} />
            <Button variant="primary" onPress={saveData} UNSAFE_style={{ cursor: 'pointer' }}>現在のデータを ZIP ファイルに保存</Button>
            <View width={32} />
            <Button variant="secondary" onPress={() => router.push('/')} UNSAFE_style={{ cursor: 'pointer' }}>&lt; 戻る</Button>
          </Flex>
          <View marginY={10}>
            {
              FILE_ENTRIES.map((entry) => (
                <DropZone
                  key={entry.label}
                  maxHeight={280}
                  isFilled={entry.value !== null}
                  getDropOperation={(types) =>
                    entry.acceptTypes.some((type) => types.has(type)) ? 'copy' : 'cancel'}
                  onDrop={async (e) => {
                    e.items.find(async (item) => {
                      item.kind === 'file' && handleFileUpload(await item.getFile(), entry.setState);
                    });
                  }}
                  margin={16}
                >
                  <IllustratedMessage maxHeight={160}>
                    <Heading>
                      {entry.label}をドラッグ＆ドロップまたは選択
                    </Heading>
                    <Content maxHeight={160}>
                      {
                        entry.value && (entry.value as BoxInspSortArea | FrameBasedEntities | PalletTraces | BoxInfos | WorkerStats | WorkerTaskEachframes).length &&
                        <View>現在のエントリ数：{(entry.value as BoxInspSortArea | FrameBasedEntities | PalletTraces | BoxInfos | WorkerStats | WorkerTaskEachframes).length}</View>
                      }
                      {
                        entry.value && (entry.value as StaticImageData).src &&
                        <img src={(entry.value as StaticImageData).src} alt={entry.label} style={{ maxHeight: 100, margin: 16 }} />
                      }
                      <FileTrigger
                        acceptedFileTypes={entry.acceptTypes}
                        onSelect={(e) => handleFileUpload(Array.from(e)[0], entry.setState)}
                      >
                        <Button variant="accent" UNSAFE_style={{ cursor: 'pointer' }}>ファイルを選択</Button>
                      </FileTrigger>
                    </Content>
                  </IllustratedMessage>
                </DropZone>
              ))
            }
            {/* <DropZone
              maxHeight={300}
              isFilled={floorImage !== null}
              getDropOperation={(types) =>
                (types.has('image/jpeg') || types.has('image/png')) ? 'copy' : 'cancel'}
              onDrop={async (e) => {
                e.items.find(async (item) => {
                  item.kind === 'file' && handleFileUpload(await item.getFile(), setFloorImage);
                });
              }}
            >
              <IllustratedMessage maxHeight={160}>
                <Heading>
                  床画像をドラッグ＆ドロップまたは選択
                </Heading>
                <Content maxHeight={160}>
                  <img src={floorImage.src} alt="Floor Image" style={{ maxHeight: 120, margin: 16 }} />
                  <FileTrigger
                    acceptedFileTypes={['image/jpeg', 'image/png']}
                    onSelect={(e) => handleFileUpload(Array.from(e)[0], setFloorImage)}
                  >
                    <Button variant="accent" UNSAFE_style={{ cursor: 'pointer' }}>ファイルを選択</Button>
                  </FileTrigger>
                </Content>
              </IllustratedMessage>
            </DropZone> */}
          </View>
        </Flex>
      </View>
    </Provider>
  );
}
