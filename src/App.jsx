import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./layout/Layout";
import Missions from "./pages/Missions";
import Robots from "./pages/Robots";
import TeleOperation from "./pages/TeleOperation";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/mission" element={<Missions />} />
          <Route path="/robot" element={<Robots />} />
          <Route path="/teleoperate/:id" element={<TeleOperation />} />
          <Route path="*" element={<Navigate to="/mission" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
