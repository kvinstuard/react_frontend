import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {UserFormPage} from "./pages/UserFormPage";
import {MainPage} from "./pages/MainPage";
import {Navigation} from './components/Navigation';
function App(){
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPage/>}/>  
        <Route path="/user-create" element={<UserFormPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App