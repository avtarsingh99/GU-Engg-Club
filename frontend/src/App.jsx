import { Route, Routes, BrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import RootLayout from './RootLayout';
import RouteError from './pages/RouteError';
import Login from './pages/Login';
function App() {
  return (
    <BrowserRouter>
      <Routes >
        {/* part 1  user logged in*/}
        <Route path='/' element={<RootLayout/>} >
          <Route index element={<Home/>}/>
          <Route path='/post' element={<Home/>}/>
        </Route>

        {/* part 2 */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/*' element = {<RouteError/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
