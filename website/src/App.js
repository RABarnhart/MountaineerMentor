import './App.css';
import MessageList from './components/MessageList';
import mountains from './assets/Mountains.jpeg';
import title from './assets/Title.png';


function App() {
  return (
      <div
          className="z-0 relative min-h-screen bg-no-repeat bg-cover bg-fixed"
          style={{ backgroundImage: `url(${mountains})` }}
      >
      <div className="absolute z-1 top-0 right-0 bottom-0 left-0 bg-black bg-opacity-40"></div>

      <div className="App relative z-10">
        <img src={title} className="w-1/2 mx-auto p-4"/>
        <MessageList />
      </div>
    </div>
      );
}

export default App;
