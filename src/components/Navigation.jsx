import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Trend from './Trend'
import '../css/Navigation.css';

function Navi(){
    let [underline, setUnderline] = useState({left:"0%"})
    let [choseContent, setChoseContent] = useState(<Trend/>)
    return(
        <>
        <div className="navi-container">
            <div className="navi-box">
                <Link className="navi-" to="/" onClick={()=>{
                    setUnderline({left:"0%"})
                    setChoseContent(<Trend/>)
                }}>
                    <span role = "img" aria-label = "하트">🤞최신</span>
                </Link>
                <Link className="navi-" to="/" onClick={()=>{
                    setUnderline({left:"50%"})
                    setChoseContent("")
                }}>
                    <span role = "img" aria-label = "질문">🤷‍♂️Q & A</span>
                </Link>
                <div className="navi-underline" style={underline}></div>
            </div>
        </div>
        {choseContent}
        </>
    )
}
export default Navi;