'use client';
import { Map, MapMarker, MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";

import useKakaoLoader from "@/contexts/use-kakao-loader";


export function MyComponent() {
  useKakaoLoader();

  return <div>
    <Map // 지도를 표시할 Container
      className="w-full h-[350px]"
      id="map"
      center={{
        // 지도의 중심좌표
        lat: 35.8753,
        lng: 128.627670,
      }}
      level={3} // 지도의 확대 레벨
    >
      <MapTypeControl position={"TOPRIGHT"} />
      <ZoomControl position={"RIGHT"} />
      <MapMarker position={{ lat: 35.8753, lng: 128.627670 }}>

        <p className="w-[150px] text-center flex justify-center items-center">흡연구역 !</p>
      </MapMarker>
    </Map>

  </div>;
}

export default function BasicMap() {

  return (
    <div className="">
      <h2 className="text-center py-10">map</h2>
      <MyComponent />
    </div>
  );
}
