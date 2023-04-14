import './App.css';
import React from 'react';
import {useState} from 'react'
import dayNightHandler from './colors.js'

function Header (props) {
  console.log("props",props)
  return <header>
  <h1><a href="/" onClick={(event)=>{
    event.preventDefault();
    props.onChangeMode();
  }}>{props.title}</a></h1>
  </header>
}
function Nav (props) {
  const lis = [
  ]
  for (let i = 0; i<props.topics.length;i++){
    let t = props.topics[i]
    lis.push(<li key={t.id}>
      <a id = {t.id}href ={"/read/"+ t.id} onClick={event =>{
      event.preventDefault();
      props.onChangeMode(Number(event.target.id));
    }}>{t.title}</a></li>)
  }
  return <nav>
        <ol>
          {lis}
        </ol>
      </nav>
}
function Article (props) {
    return <article>
            <h2>{props.title}</h2>
            {props.body}
          </article>
}
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value
      const body = event.target.body.value
      props.onCreate(title,body);
    }}>
      <p><input type="text" name = "title" placeholder="제목"/></p>
      <p><textarea name="body" placeholder="내용"></textarea></p>
      <p><input type = "submit" value="작성"></input></p>
    </form>
  </article>
}
function Update(props){
  const [title,setTitle] = useState(props.title);
  const [body,setBody] = useState(props.body);
  return <article>
    <h2>수정</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value
      const body = event.target.body.value
      props.onUpdate(title,body);
    }}>
      <p><input type="text" name = "title" placeholder="제목" value={title} onChange={(event)=>{
        setTitle(event.target.value)
      }}/></p>
      <p><textarea name="body" placeholder="내용" value={body} onChange={(event)=>{
        setBody(event.target.value)
      }}></textarea></p>
      <p><input type = "submit" value="수정"></input></p>
    </form>
  </article>
}
function DayNightHandler () {
  return <button onClick={dayNightHandler}>야간모드</button>
}
function App() {
  const [mode,setMode] = useState('WELCOME');
  const [id,setId] = useState(null);
  const [nextId,setNextId] = useState(4);
  const [topics,setTopics] = useState([
    {id:1,title:"html",body:"html is ..."},
    {id:2,title:"css",body:"css is ..."},
    {id:3,title:"javascript",body:"javascript is ..."},
  ])
  let content = null
  let contextControl = null;
  if(mode === 'WELCOME'){
    content = <Article title = "Welcome" body = "Hello, WEB"></Article>
  }else if(mode === 'READ'){
    let title, body=null;
    for(let i=0;i<topics.length;i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body
        break;
      }
    }
    content = <Article title = {title} body = {body}></Article>
    contextControl = <><li><a href = {"/update/" +id} onClick = {event => {
      event.preventDefault();
      setMode('UPDATE');
    }}>
      수정</a></li>
      <li>
        <input type="button" value="삭제" onClick={() => {
          const newTopics = []
          for(let i=0; i<topics.length; i++){
            if(topics[i].id !== id){
              newTopics.push(topics[i]);
            }
          }
          setTopics(newTopics);
          setMode('WELCOME')
        }}/>
      </li>
      </>
  }else if(mode === 'CREATE'){
    content = <Create onCreate={(_title,_body)=>{
      const newTopic = {id:nextId,title:_title, body:_body}
      const newTopics = [...topics]
      newTopics.push(newTopic)
      setTopics(newTopics)
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}></Create>
  }else if(mode ==='UPDATE'){
    let title, body=null;
    for(let i=0;i<topics.length;i++){
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body
        break;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title,body)=>{
      const newTopics=[...topics]
      const updateTopic = {id:id,title:title, body:body}
      for(let i = 0; i<newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i]=updateTopic;
          setMode('READ');
          break;
        }
      }
      setTopics(newTopics)
    }}></Update>
  }
  return (
    <div>
      <DayNightHandler></DayNightHandler>
      <Header title="WEB" onChangeMode= {() => {
        setMode('WELCOME')
      }}></Header>
      <Nav topics={topics} onChangeMode = {(_id) => {
        setMode('READ')
        setId(_id)
      }}></Nav>
      {content}
      <ul>
      <li><a href = "/create" onClick ={event =>{
        event.preventDefault();
        setMode('CREATE');
      }}>새 글</a></li>
      {contextControl}
      </ul>
    </div>
  );
  }
export default App;
