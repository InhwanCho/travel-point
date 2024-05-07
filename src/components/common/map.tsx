'use client';
import { CustomOverlayMap, Map, MapInfoWindow, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import useKakaoLoader from "@/contexts/use-kakao-loader";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
        <MapMarker title='맵 타이틀' position={state} onClick={() => setIsOpen(!isOpen)}>
          {isOpen && (
            <CustomOverlayMap position={state}>
              <div className="wrap relative bottom-10 left-0 ml-[-144px] w-[288px] h-[132px] text-left overflow-hidden text-sm font-sans leading-6">
                <div className="info w-[286px] h-[120px] rounded-t-md border-b-2 border-r border-gray-300 bg-white shadow">
                  <div className="title flex items-center h-7 pl-2.5 bg-gray-200 border-b border-gray-200 text-lg font-bold">
                    카카오 스페이스닷원
                    <div className="close absolute top-2.5 right-2.5 w-4 h-4 bg-[url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png')]"></div>
                  </div>
                  <div className="body relative overflow-hidden">
                    <div className="img absolute top-1.5 left-1.5 w-[73px] h-[71px] border border-gray-300">
                      <img src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/thumnail.png" width="73" height="70" />
                    </div>
                    <div className="desc relative mt-3 ml-[90px] h-[75px]">
                      <div className="ellipsis overflow-hidden overflow-ellipsis whitespace-nowrap">제주특별자치도 제주시 첨단로 242</div>
                      <div className="jibun text-xs text-gray-500 mt-[-0.5rem]">(우) 63309 (지번) 영평동 2181</div>
                      <div><a href="https://www.kakaocorp.com/main" target="_blank" className="link text-blue-600">홈페이지</a></div>
                    </div>
                  </div>
                </div>
              </div>
            </CustomOverlayMap>
          )}
        </MapMarker>
      </Map>
      <div className="absolute inset-x-0 top-0 bg-white z-10 text-center font-semibold">여행지 주변 지도</div>    
      <button onClick={resetCenter} className="border bg-white p-1 absolute top-0 right-0 z-20">
        <p className="text-xs">여행지로 이동하기</p>
      </button>
    </div>
  );
}
