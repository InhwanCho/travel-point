'use client';
import { CustomOverlayMap, Map, MapInfoWindow, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import useKakaoLoader from "@/contexts/use-kakao-loader";
import { useState } from "react";
import { cn } from "@/libs/utils";

interface KakaoMapProps {
  latitude: number;
  longitude: number;
  className?: string
}
// latitude={35.8753} longitude={128.62767}
export default function KakaoMap({ latitude = 35.8753, longitude = 128.62767, className }: KakaoMapProps) {
  useKakaoLoader();
  const [state, setState] = useState({ lat: latitude, lng: longitude });
  const [isOpen, setIsOpen] = useState(false);

  const resetCenter = () => {
    // 기존 위치로 재설정
    setState({ lat: latitude, lng: longitude });
    // 약간의 지연 후에 위치를 미세 조정하여 매번 반응하도록 함
    setTimeout(() => {
      setState(prevState => ({ lat: prevState.lat, lng: prevState.lng + 0.00000001 }));
    }, 10);
  };


  return (
    <div className={cn('relative', className)}>
      <Map
        className="w-full h-[420px] lg:h-[460px]"
        id="map"
        level={3} // 지도의 확대 레벨
        center={state}
        isPanto={true}
      >
        <ZoomControl position={"BOTTOMRIGHT"} />
        <MapMarker title='맵 타이틀' position={state} >
          <div className="text-slate-600">hi</div>
        </MapMarker>
      </Map>
      <div className="absolute inset-x-0 top-0 bg-white z-10 text-center font-semibold">여행지 주변 지도</div>
      <button onClick={resetCenter} className="border bg-white p-1 absolute top-0 right-0 z-20">
        <p className="text-xs">여행지로 중심 이동하기</p>
      </button>
    </div>
  );
}
function handleWheel(this: Window, ev: WheelEvent) {
  throw new Error("Function not implemented.");
}

