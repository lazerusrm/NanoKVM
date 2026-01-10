import { atom } from 'jotai';

import { Resolution } from '@/types';

export const isHdmiEnabledAtom = atom(true);

// video mode
// h264: stream H.264 over WebRTC (default, best quality + low latency)
// mjpeg: stream JPEG over HTTP (fallback for compatibility)
export const videoModeAtom = atom('h264');

export const videoScaleAtom = atom<number>(1.0);

// browser screen resolution
export const resolutionAtom = atom<Resolution | null>(null);
