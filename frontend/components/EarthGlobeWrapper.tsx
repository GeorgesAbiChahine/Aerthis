'use client'
import EarthLoading from '@/components/EarthLoading';
import dynamic from 'next/dynamic';

interface HeatmapPoint { lat: number; lng: number; aqi: number }
interface PlasticPoint { lat: number; lng: number }

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
