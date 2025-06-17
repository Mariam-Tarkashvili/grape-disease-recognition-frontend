import React, { useState } from 'react';
import Chatbot from './components/Chatbot';
import Bar from './components/Bar';
import './App.css';

function App() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="container">
      <Bar
  onTitleClick={() => setShowChat(true)}
  onLogoClick={() => setShowChat(false)}
  showChat={showChat}
/>

      <h1 className="big-message">With the help of AI your vineyard is safe...</h1>
        <p className="authors"> Mariam Tarkashvili and Giorgi Leshkasheli</p>
<ul className="citations">
  <li>
    <h1 className="citationHead">Datasets for Training</h1>
    <h3 className="citationContent"> https://data.mendeley.com/datasets/8nnd2ypcv3/3 </h3>
    <h3 className="citationContent"> https://figshare.com/articles/dataset/Healthy_and_Disease_affected_Leaves_of_Grape_Plant/13083890/1?file=25038128 </h3>
      </li>
    <li> 
    <h1 className="citationHead" >Background Photo</h1>
    <h3 className="citationContent"> Pinterest </h3>
    </li>
    <li>
     <h1 className="citationHead">Logo and Button Generation</h1>
    <h3 className="citationContent"> recraft.ai </h3>
 </li>
</ul>



      {!showChat && (
        <button
          className="chat-toggle-button"
          onClick={() => setShowChat(true)}
        >
          Open Chat
        </button>
      )}

      {showChat && (
  <div className="chatbox-wrapper">
    <div className="chatbox-header">
      <button className="close-chat" onClick={() => setShowChat(false)}>X</button>
    </div>
    <Chatbot />
  </div>
)}
    </div>
  );
}

export default App;
