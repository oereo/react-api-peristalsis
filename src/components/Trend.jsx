import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import '../css/Trend.css';

function Trend(){
    let [filterList] = useState([{id : 1, language: 'Python'}, {id : 2, language : 'React'}, {id : 3, language : 'Java'}, {id : 4, language :'C#'}, {id : 5, language:'C'}, {id : 6, language:'C++'}, {id : 7, language:'GO'}, {id : 8, language:'Javascript'}, {id : 9, language:'Html,CSS'}])
    let [todolist, setTodoList] = useState([])
    let [userPhoto, setUserPhoto] = useState()

    // views.py에서 권한이 없이 데이터조회를 가능하게 했기때문에 posts의 정보를 불러올 수 있다.
    useEffect(()=>{
        (()=> {
        try{
            fetch('http://localhost:8000/api/Todos/')
            .then((res)=>res.json())
            .then((posts)=>{
                setTodoList(posts)
            })
        } catch(e){
            console.log(e)
        }
        })();
    },[])

    useEffect(()=>{
        fetch('http://localhost:8000/user/current/', {
          headers: {
            Authorization: `JWT ${localStorage.getItem('token')}`
          }
        })
        .then(res => res.json())
        .then(json => {
          // 현재 유저 정보 받아왔다면, 로그인 상태로 state 업데이트 하고
          if (json.id) {
            //유저정보를 받아왔으면 해당 user의 프로필을 받아온다.
        }fetch('http://localhost:8000/user/auth/profile/' + json.id + '/update/',{
                method : 'PATCH',
                headers: {
                    Authorization: `JWT ${localStorage.getItem('token')}`
                },
            })
            .then((res)=>res.json())
            .then((userData)=> {
                setUserPhoto(userData.photo)
            })
            .catch(error => {
                console.log(error);
              });;
        }).catch(error => {
            console.log(error)
          });
    },[userPhoto])

    return(
        <div className="trend-section">
            <main className="trend-main">
                <div className="main-section">
                        {
                            todolist.slice(0).reverse().map((a)=>{
                                return(
                                    <div className="article" key={a.id}>
                                        <Link to="/">
                                            <div className="arcticle-img">
                                                <img src={"http://localhost:8000" + a.image} alt=""></img>
                                            </div>
                                        </Link>
                                        <div className="article-content">
                                            <Link to="/">
                                                <h4>{a.title}</h4>
                                                <div className="desc-wrapper">
                                                    <p>{a.content}</p>
                                                </div>
                                            </Link>
                                            <div className="sub-info">
                                                <span>{a.date}</span>
                                                <span className="separator">·</span>
                                                <span>{a.comment}개의 댓글</span>
                                            </div>
                                        </div>
                                        <div className="article-footer">
                                            <Link to="/">
                                                <img src={a.profileImage} alt=""></img>
                                                <span>"by " <b>{a.username}</b></span>
                                            </Link>
                                            <div className="likes">
                                                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"></path></svg>
                                                {a.like}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                </div>
            </main>
            <aside className="pDRpR">
            <div className="eyrfCG">
                <div className="filter__head">
                </div>
                <section>
                <ul>
                    {
                    filterList.map((a)=>{
                        return(
                        <li key={a.id}>
                            <input id={a.language} className="filters-input__checkbox" value="action" type="checkbox" data-type="genres"></input>
                            <label className="input__label | filters-input__label--checkbox" htmlFor={a.language}>
                            <span>{a.language}</span>
                            <span className="filters-input__tick">
                                <svg focusable="false" aria-hidden="true">
                                <use xlinkHref="#check">
                                    <svg viewBox="0 0 24 24" id="check" xmlns="http://www.w3.org/2000/svg"><path d="M9 21.035l-9-8.638 2.791-2.87 6.156 5.874 12.21-12.436L24 5.782z"></path></svg>
                                </use>
                                </svg>
                            </span>
                            </label>
                        </li>
                        )
                    })
                    }
                </ul>
                </section>
            </div>
            </aside>
        </div>
    )
}
export default Trend;