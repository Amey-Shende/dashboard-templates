import { useRoutes } from "react-router-dom";
import Routers from "./routes/Router";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const router = useRoutes(Routers);

  return <div className="App">
    {router}
  </div>

}

export default App;
