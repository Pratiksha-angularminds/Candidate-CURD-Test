
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router-dom";
import List from "./components/List"
import Add from './components/Add';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to ="/List" />}/>
          <Route path="/List" element={<List />} />
          <Route path="/Add" element={<Add />} />
        </Routes>
      </Router>
            
    </div>
  );
}

export default App;
