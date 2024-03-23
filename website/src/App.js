import './App.css';
import MessageList from './components/MessageList';




function App() {
  return (
    <div className="App">
      <header className="App-header">

        <h1 className='text-5xl text-amber-300 p-2 uppercase font-bold'>Mountaineer Mentor</h1>

        <MessageList /> 

        <h2>Ask Your Question Here!</h2>
        <input className='userInput m-2 w-[40%] mb-6 bg-black/5 border border-white p-2'/>

        <h3>Example Question Box</h3>
        <p className='text-lg text-gray-400 p-1'>Select One!</p>
            <ul className='p-3 border bg-black/5 rounded'>
            <li><button>How is your day?</button></li>
            <li><button>When is the next football game?</button></li>
            <li><button>How far is Anne Belk Hall from Walker Hall?</button></li>
        </ul>
      
      </header>
    </div>
  );
}

export default App;
