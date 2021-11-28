import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

//styling
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`;

const SearchContainer = styled.div`
    background-color: white;
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 2;
    width: 20%;
    height: 3%;
    padding-left: 10px;
    margin-top: 20px;
    border-radius: 15px;
`;
const SearchInput = styled.input`
    border-width: 0px;
    width: 70%;
    font-size: 16px;
`;

const Home = (props) => {
    const [input, setInput] = useState("");
    const [update, setUpdate] = useState(false);

    // 키워드 input state에 저장
    const handleSubmit = (e) => {
        console.log(input);
        setUpdate(true);
        e.preventDefault();
    };

    const container = useRef(null);

    const defaultOptions = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(
            37.545642179638556,
            126.98117041998981
        ), //지도의 중심좌표.
        level: 4, //지도의 레벨(확대, 축소 정도)
    };

    // 첫 화면 지도

    useEffect(() => {
        const map = new window.kakao.maps.Map(
            container.current,
            defaultOptions
        );
    }, []);

    // 키워드 검색

    useEffect(() => {
        const searchOptions = {
            //지도를 생성할 때 필요한 기본 옵션
            center: new window.kakao.maps.LatLng(
                37.545642179638556,
                126.98117041998981
            ), //지도의 중심좌표.
            level: 4, //지도의 레벨(확대, 축소 정도)
        };
        //지도 생성 및 객체 리턴
        const map = new window.kakao.maps.Map(container.current, searchOptions);
        // 장소 검색 객체 생성
        let ps = new window.kakao.maps.services.Places();

        // 키워드로 장소를 검색
        ps.keywordSearch(input, placesSearchCB);

        function displayMarker(place) {
            let marker = new window.kakao.maps.Marker({
                map: map,
                position: new window.kakao.maps.LatLng(place.y, place.x),
            });
            window.kakao.maps.event.addListener(marker, "click", () => {
                alert(place.place_name);
            });
        }

        function placesSearchCB(data, status, pagination) {
            if (status === window.kakao.maps.services.Status.OK) {
                let bounds = new window.kakao.maps.LatLngBounds();

                for (let i = 0; i < data.length; i++) {
                    displayMarker(data[i]);
                    bounds.extend(
                        new window.kakao.maps.LatLng(data[i].y, data[i].x)
                    );

                    map.setBounds(bounds);
                }
            }
        }

        setUpdate(false);
    }, [update]);

    const mapStyle = {
        width: WIDTH,
        height: HEIGHT,
    };

    return (
        <Container>
            <SearchContainer>
                <SearchIcon fontSize="16" />
                <form action="/" method="get" onSubmit={handleSubmit}>
                    <SearchInput
                        value={input}
                        type="text"
                        placeholder="검색"
                        name="search_input"
                        onInput={(e) => setInput(e.target.value)}
                    />
                </form>
            </SearchContainer>
            <div id="map" style={mapStyle} ref={container}></div>
        </Container>
    );
};

export default Home;
