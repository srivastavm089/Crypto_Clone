import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom';

import {Home, CoinsDetails, Exchanges , Header,Coins} from './component' 
import Footer from './component/Footer';
const App = () => {
  return (
<BrowserRouter>
<Header/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/coins' element={<Coins/>}/>
        <Route path='/exchanges' element={<Exchanges/>}/>
        <Route path='/coin/:id' element={<CoinsDetails/>}/>
    </Routes>
    <Footer/>
</BrowserRouter>
  )
}

export default App