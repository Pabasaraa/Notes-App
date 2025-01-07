import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './component/sidebar/sidebar';
import Layout from './layout';
import Home from './pages/home';
import Note from './pages/note';

const App = () => {
  return (
    <Router>
      <div className="h-screen overflow-hidden !bg-background">
        <Sidebar />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes/:id" element={<Note />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
