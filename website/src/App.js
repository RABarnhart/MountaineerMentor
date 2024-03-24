import './App.css';
import MessageList from './components/MessageList';
import mountains from './assets/mountains.jpg'


function App() {
  return (
    <div>
        <div className="App">
          <header className="App-header">
            <h1 className='text-5xl text-amber-300 p-2 uppercase font-bold font-[Freshman]'>Mountaineer Mentor</h1>

            <MessageList /> 
          </header>
        </div>
    </div>
  );
}

export default App;
