import {useState, useEffect} from 'react';



const App=()=>{

const[value,setValue]=useState(null);
const[message,setMessage]=useState(null);
const [currentTitle,setcurrentTitle] = useState(null);
const[previousChat,setPreviousChat]=useState([]);

  const createNewChat=()=>{
    setMessage(null);
    setValue("");
    setcurrentTitle(null);
  }

  
  const handleClick=(uniqueTitles)=>{
    setcurrentTitle(uniqueTitles);
    setMessage(null);
    setValue("");
  }

  const getMessages=async ()=>{
    const options={
      method:"POST",
      body: JSON.stringify({
        // model:"gpt-3.5-turbo",
        message:value
      }),
      headers:{
        "Content-Type":"application/json"
      }
    }
       try{
          const response= await fetch("http://localhost:8000/completions",options);
          const apiResponse= await response.json();
          setMessage(apiResponse.choices[0].message);
          // console.log(apiResponse);
       }
       catch(error){
          console.error(error);
       }

  } 
 
  useEffect(()=>{

    console.log(currentTitle,value,message);
    if(!currentTitle && value && message){
      setcurrentTitle(value);
    }
    if(currentTitle && value && message){
      setPreviousChat(previousChat=>(
        [...previousChat,
          {
          title: currentTitle,
          role:"user",
          content:value
        },
        {
          title:currentTitle,
          role:message.role,
          content:message.content
        }]
      ))
    }


  },[message,currentTitle])

  console.log(previousChat);
 const currentChat= previousChat.filter(previousChat=>previousChat.title===currentTitle);
 const uniqueTitles=Array.from(new Set(previousChat.map(previousChat=>previousChat.title)));

 console.log(uniqueTitles);

  return (
    <div className="app">
      <section className="sideBar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
        {uniqueTitles?.map((uniqueTitles,index)=> <li key={index} onClick={()=>handleClick(uniqueTitles)}>{uniqueTitles}</li>)} 
        </ul>
        <nav>
          <p>Made by Sneha</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>snehaGPT</h1>}
        
        <ul className="feed">
          {currentChat?.map((chatMessage, index) =><li key={index}>
            <p className="role">{chatMessage.role}</p>
            <p>{chatMessage.content}</p>

          </li>)}

        </ul>
        <div className="bottomSection">
          <div className="inputContainer">
          <input value={value} onChange={(e)=>setValue(e.target.value)}/>
          <div id="submit" onClick={getMessages}>➢</div>
          </div>
          <p className="info">
               Sneha GPT. Free Research Preview.
               It is the clone of ChatGPT.
               It uses openAI API.
          </p>
        </div>
      </section>

    </div>
  );
};

export default App;
