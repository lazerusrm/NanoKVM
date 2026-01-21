import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { MonitorIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { updateScreen, setAutoQuality } from '@/api/vm';
import { resolutionAtom, videoModeAtom } from '@/jotai/screen.ts';
import { getQuality as getQualityCookie } from '@/lib/localstorage.ts';
import { MenuItem } from '@/components/menu-item.tsx';

import { Quality } from './quality.tsx';
import { Reset } from './reset.tsx';
import { Resolution } from './resolution';
import { Scale } from './scale';
import { VideoMode } from './video-mode.tsx';

export const Screen = () => {
  const { t } = useTranslation();

  const videoMode = useAtomValue(videoModeAtom);
  const resolution = useAtomValue(resolutionAtom);

  // Quality state: 0 = Auto (default), 1-4 = manual quality levels
  const [quality, setQuality] = useState(() => {
    const stored = getQualityCookie();
    return stored !== null ? stored : 0; // Default to Auto (0)
  });

  useEffect(() => {
    updateScreen('type', videoMode === 'mjpeg' ? 0 : 1);
    updateScreen('resolution', resolution!.height);

    // Enable auto quality mode on startup if quality is 0
    if (quality === 0) {
      setAutoQuality(true);
    }
  }, []);

  const content = (
    <div className="flex flex-col space-y-1">
      <VideoMode />
      <Resolution />
      <Quality quality={quality} setQuality={setQuality} />
      <Scale />
      <Reset />
    </div>
  );

  return <MenuItem title={t('screen.title')} icon={<MonitorIcon size={18} />} content={content} />;
};
