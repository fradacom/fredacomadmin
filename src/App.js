import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import Views from './views';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
          <Router>
            <Routes>
              <Route path="/*" element={<Views />}/>
            </Routes>
          </Router>
      </Provider>
    </div>
  );
}

export default App;
