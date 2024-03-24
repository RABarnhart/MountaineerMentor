import './App.css';
import MessageList from './components/MessageList';
import mountains from './assets/Mountains.jpeg'


function App() {
  return (
      <div
          className="z-0 relative min-h-screen bg-no-repeat bg-cover bg-fixed"
          style={{ backgroundImage: `url(${mountains})` }}
      >
      <div className="absolute z-1 top-0 right-0 bottom-0 left-0 bg-black bg-opacity-40"></div>

      <div className="App relative z-10">
        <h1 className='text-5xl text-gold p-8 text-6xl font-[Freshman] uppercase font-bold'>Mountaineer Mentor</h1>
        <MessageList />
      </div>
    </div>
      );
}

export default App;
