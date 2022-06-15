import "./App.css";
import { GardensContextProvider } from "./Contexts/GardensContext";
import ViewBrowse from "./Views/ViewBrowse";

function App() {
  return (
    <div className="App">
      <GardensContextProvider>
        <ViewBrowse />
      </GardensContextProvider>
    </div>
  );
}

export default App;
