import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import SignUpLogIn from "./components/SignUpLogIn";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<SignUpLogIn />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
};

export default App;
