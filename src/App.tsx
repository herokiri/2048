import './App.css'
import BoardComponent from "./components/BoardComponent";

function App() {

  return (
    <>
        <div className={'container'}>
            <h1>2048</h1>
            <BoardComponent />
        </div>
    </>
  )
}

export default App
