import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {UserFormPage} from "./pages/UserFormPage";
import {MainPage} from "./pages/MainPage";
import {Navigation} from './components/Navigation';
import {Toaster} from 'react-hot-toast';

function App(){
  return (
    <BrowserRouter>
      <div className='container mx-auto '>
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPage/>}/>  
        <Route path="/user-create" element={<UserFormPage/>}/>
      </Routes>
      <Toaster/>
      </div>
    </BrowserRouter>
  );
}

export default App