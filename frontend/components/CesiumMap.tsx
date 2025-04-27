'use client';

import { useEffect, useRef } from 'react';
import { Viewer, Ion, createWorldTerrainAsync } from 'cesium';

Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN!;

export default function CesiumMap() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    let viewer: Viewer | undefined;
    let cancelled = false;

    (async () => {
      // ← nouvelle API asynchrone
      const terrainProvider = await createWorldTerrainAsync();

      if (cancelled) return;               // sécurité si unmount avant la fin
      viewer = new Viewer(container.current!, {
        terrainProvider,
      });
    })();

    return () => {
      cancelled = true;
      viewer?.destroy();
    };
  }, []);

  return <div ref={container} className="h-screen w-screen" />;
}
