import { useAtomValue } from 'jotai';

import { videoModeAtom } from '@/jotai/screen.ts';

import { H264Webrtc } from './h264-webrtc.tsx';
import { Mjpeg } from './mjpeg.tsx';

export const Screen = () => {
  const videoMode = useAtomValue(videoModeAtom);

  if (videoMode === 'mjpeg') {
    return <Mjpeg />;
  }

  // Default to H.264 WebRTC (best quality + low latency)
  return <H264Webrtc />;
};
