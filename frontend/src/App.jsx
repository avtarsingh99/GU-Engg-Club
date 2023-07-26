import { Route, Routes, BrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import RootLayout from './RootLayout';
import RouteError from './pages/RouteError';
import Login from './pages/Login';
function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path='/' element={<RootLayout/>} >
          <Route index element={<Home/>}/>
          <Route path='/home2' element={<Home/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/*' element = {<RouteError/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
