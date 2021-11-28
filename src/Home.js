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
    const [markers, setMarkers] = useState([]);
    const container = useRef(null);

    const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(
            37.545642179638556,
            126.98117041998981
        ), //지도의 중심좌표.
        level: 6, //지도의 레벨(확대, 축소 정도)
    };

    //키워드 검색 함수

    useEffect(() => {
        //지도 생성 및 객체 리턴
        const map = new window.kakao.maps.Map(container.current, options);
    }, []);

    const mapStyle = {
        width: WIDTH,
        height: HEIGHT,
    };

    return (
        <Container>
            <SearchContainer>
                <SearchIcon fontSize="16" />
                <SearchInput placeholder="검색어를 입력해주세요." />
            </SearchContainer>
            <div id="map" style={mapStyle} ref={container}></div>
        </Container>
    );
};

export default Home;
