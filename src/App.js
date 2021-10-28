//import AppData from './AppData';
//import GuestUser from './GuestUser';
import {  useState } from 'react';
import Amplify ,{Auth}from 'aws-amplify';
import  { AmazonAIPredictionsProvider } from '@aws-amplify/predictions';
import awsconfig from './aws-exports';
import './App.css'
//import { withAuthenticator } from '@aws-amplify/ui-react';
import Predictions from '@aws-amplify/predictions';

import './App.css'

Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());




function App() {
  const [login,setLogin] =useState(true)
  const [data, setData] = useState('');
  const [answer, setAnswer] = useState('');
function handleData(e){
  console.log(e.target.value)
  setData(e.target.value);
 // setAnswer(data)
}
function test(data){
  
  if(data.length>0){
   // console.log(data)
    if(data.length<80){
      if(login){
      apiCall(data)
      }
      setLogin(false)
      setTimeout(()=>{
        setLogin(true)
      },10000)    
    }
    else 
      alert('text size exceeds 40 character')
  }else{
   // console.log('invalid')
    alert('text size is 0 ')
  }
}

function apiCall(textToTranslate){
  
  Predictions.convert({
    translateText: {
      source: {
        text: textToTranslate,
        // language : "es" // defaults configured on aws-exports.js
        // supported languages https://docs.aws.amazon.com/translate/latest/dg/how-it-works.html#how-it-works-language-codes
      },
      // targetLanguage: "en"
    }
  })
  .then(res =>{
    console.log(res)
    console.log(res.text)
    setAnswer(res.text)
  })
    .catch(err => {
      console.log({ err })
      alert(err)
    })
} 
function signOutFunction(){
  Auth.signOut();
  setTimeout(()=>{
    window.location.reload(false);
}, 500);
}
  return (<>
    <div className="heading">
      <h1>Translate Text from English to Hindi</h1>
      
    </div>
    <div className="container">
      <div className="item item1">
        <div className="input-item">
          <input placeholder="Enter the text here to translate" type="text" onChange={e=>handleData(e)}/>
        </div>
        <button onClick={e=>test(data)}>Submit</button>
      </div>
      <div className="item item2">
        <p placeholder="translated text">{answer}</p>
      </div>
    </div>
    </>
  );
}

export default  App;
//export default App;
