'use client'
import EarthLoading from '@/components/EarthLoading';
import dynamic from 'next/dynamic';

const DynamicEarthGlobe = dynamic(
  () => import('@/components/EarthGlobe'),
  { ssr: false, loading: () => <EarthLoading /> }
);

export default function EarthGlobeWrapper(
    { heatmapData, plasticData }:
    { heatmapData: HeatmapPoint[]; plasticData: PlasticPoint[] }
  ) {
  return (
    <div>
      <DynamicEarthGlobe heatmapData={heatmapData} plasticData={plasticData}/>
    </div>
  );
}
