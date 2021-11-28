import React, { useState, useRef, useEffect } from "react";

const Home = (props) => {
    const container = useRef(null);

    useEffect(() => {
        const options = {
            //지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(
                37.545642179638556,
                126.98117041998981
            ), //지도의 중심좌표.
            level: 6, //지도의 레벨(확대, 축소 정도)
        };

        const map = new window.kakao.maps.Map(container.current, options);
        const marker = new window.kakao.maps.Marker({
            position: map.getCenter(),
        });

        marker.setMap(map);
        marker.setDraggable(true);

        //지도 생성 및 객체 리턴
    }, []);

    const mapStyle = {
        width: "100%",
        height: "900px",
    };

    return (
        <>
            <div id="map" style={mapStyle} ref={container}>
                <input />
            </div>
        </>
    );
};

export default Home;
