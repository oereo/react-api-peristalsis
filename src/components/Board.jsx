import React, { useState, useEffect } from 'react';
import '../css/Board.css';
import '../css/Thumbnail.css'
import { useHistory } from 'react-router'


function Board(props){
    let [filterList] = useState([{id : 1, language: 'Python'}, {id : 2, language : 'React'}, {id : 3, language : 'Java'}, {id : 4, language :'C#'}, {id : 5, language:'C'}, {id : 6, language:'C++'}, {id : 7, language:'GO'}, {id : 8, language:'Javascript'}, {id : 9, language:'Html,CSS'}])
    let Today = new Date();
    let date = Today.getFullYear() + "-" + Today.getMonth() + "-" + Today.getDate()
    let [languagefilter, setLanguagefilter] = useState("")

    const histoty = useHistory()
    let [goback, setGoback] = useState(false)
    let [imgGoback, setImgGoback] = useState(false)

    let [img , setImg] = useState()
    let [imgURL, setImgURL] = useState()
    let [title , setTitle] = useState()
    let [content , setContent] = useState("")
    let [userPhoto, setUserPhoto] = useState()

    let sendData;
    const handleEffect = (handleSubmit) => {
        sendData = {
            image : imgURL,
            title : title,
            content : content,
            date : date,
            comment : 0,
            like : 0,
            username : props.user,
            language : languagefilter,
            profileImage : userPhoto
        }
        handleSubmit()
    }

    const handleSubmit = () => {
        let form_data = new FormData();
        let fileField = document.querySelector('input[type="file"]');
        form_data.append('title', sendData.title);
        form_data.append('content', sendData.content);
        form_data.append('date', sendData.date);
        form_data.append('comment', sendData.comment);
        form_data.append('language', sendData.language);
        form_data.append('like', sendData.like);
        form_data.append('username', sendData.username);
        form_data.append('image', fileField.files[0])
        form_data.append('profileImage', sendData.profileImage)

        fetch("http://localhost:8000/api/Todos/", {
            method : 'POST',
            headers: {
                Authorization : `JWT ${localStorage.getItem('token')}`,
            },
            body : form_data
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', JSON.stringify(response)));
    };

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
    <>
    {
        goback === false
        ?(
        <section className="container-section">
            <article className="write-container">
            <div className="post-title">
                <textarea name="" id="" cols="30" rows="10"  placeholder="제목을 입력하세요" onChange={(e)=>{setTitle(e.target.value)}}></textarea>
            </div>
            <div className="post-contents">
            <textarea className="post-textarea" placeholder="내용을 입력하세요" onChange={(e)=>{setContent(e.target.value)}}></textarea>
                <div>
                    <div className="contents-scroll">
                        <input type="hidden" name="textType" value="HTML" id="textType"></input>
                    </div>
                </div>
            </div>
            <footer className="post-comment">
                <button className="exit-btn transparent-btn" onClick={()=>{histoty.goBack()}}>✔ 나가기</button>
                <div>
                    <button className="transparent-btn" onClick={()=>{
                        setGoback(true)
                    }}>발행</button>
                </div>
            </footer>
            </article>
            <article className="view-container">
                <div className="view-margin">
                    <h1>{title}</h1>
                    <div className="view-content">
                        <div>
                            <p>
                                {
                                content.split('\n').map( (line, i) => {
                                    return (<span key={i}>{line}<br/></span>)
                                })
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </article>
        </section>
        )
        :(
        <div className="thumbnail_container">
            <div className="thumbnail_section">
                <div className="left_section">
                    <section className="left_container">
                        <h3>포스트 미리보기</h3>
                        <button className="upButton">
                            <label htmlFor="file" className="img-up">
                                <input type="file" id="file" accept=".jpg, .png, .jpeg, .gif" onChange={(e)=>{
                                    e.preventDefault();
                                    let reader = new FileReader();
                                    let file = e.target.files[0];
                                    reader.onloadend = () => {
                                    setImg(file)
                                    setImgURL(reader.result)
                                    }
                                    reader.readAsDataURL(file);
                                    setImgGoback(true)
                                }}></input>
                        이미지 업로드</label></button>
                            <button className="upButton" onClick={()=>{
                                setImg(null)
                                setImgURL(null)
                                setImgGoback(false)
                            }}>이미지 제거</button>
                        <div className="left_container2">
                            <div className="left_container3">
                                <div className="img_container">
                                    <div className="img_container2">
                                        {
                                            imgGoback === false
                                            ? <svg width="107" height="85" fill="none" viewBox="0 0 107 85"><path fill="#868E96" d="M105.155 0H1.845A1.844 1.844 0 0 0 0 1.845v81.172c0 1.02.826 1.845 1.845 1.845h103.31A1.844 1.844 0 0 0 107 83.017V1.845C107 .825 106.174 0 105.155 0zm-1.845 81.172H3.69V3.69h99.62v77.482z"></path><path fill="#868E96" d="M29.517 40.84c5.666 0 10.274-4.608 10.274-10.271 0-5.668-4.608-10.276-10.274-10.276-5.665 0-10.274 4.608-10.274 10.274 0 5.665 4.609 10.274 10.274 10.274zm0-16.857a6.593 6.593 0 0 1 6.584 6.584 6.593 6.593 0 0 1-6.584 6.584 6.591 6.591 0 0 1-6.584-6.582c0-3.629 2.954-6.586 6.584-6.586zM12.914 73.793a1.84 1.84 0 0 0 1.217-.46l30.095-26.495 19.005 19.004a1.843 1.843 0 0 0 2.609 0 1.843 1.843 0 0 0 0-2.609l-8.868-8.868 16.937-18.548 20.775 19.044a1.846 1.846 0 0 0 2.492-2.72L75.038 31.846a1.902 1.902 0 0 0-1.328-.483c-.489.022-.95.238-1.28.6L54.36 51.752l-8.75-8.75a1.847 1.847 0 0 0-2.523-.081l-31.394 27.64a1.845 1.845 0 0 0 1.22 3.231z"></path></svg>
                                            : <img src={imgURL} alt=""></img>
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="title-margin">
                                <h4>{title}</h4>
                                <textarea name="viewContent">{content}</textarea>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="line_section"></div>
                <div className="right_section">
                    <div className="fillter_section">
                    <section>
                <ul>
                    {
                    filterList.map((a)=>{
                        return(
                        <li key={a.id}>
                            <input id={a.language} className="filters-input__checkbox" value="action" type="checkbox" data-type="genres" onChange={()=>{
                                let ReLang = [...languagefilter]
                                ReLang.push(a.language)
                                setLanguagefilter(ReLang)
                            }}></input>
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
                    <div>
                        <button className="upButton" onClick={()=>{
                            handleEffect(handleSubmit)
                            setGoback(false)
                            histoty.goBack()
                        }}>출간하기</button>
                    </div>
                </div>
            </div>
        </div>
        )
    }
    </>
  )
}

export default Board;