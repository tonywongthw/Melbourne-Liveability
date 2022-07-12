import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Chartpage from './components/chartpage';
import Newpage from './components/newpage';
import {App} from './app'
import MapBase from './components/map/mapBase';

ReactDOM.render(
<BrowserRouter>
<Routes>
    <Route path='/' element={<App />}>
        <Route path='mortgage' element={<MapBase tabNumber={1}/>}></Route>
        <Route path='rent' element={<MapBase tabNumber={2}/>}></Route>
        <Route path='family' element={<MapBase tabNumber={3} />}></Route>
        <Route path='personal' element={<MapBase tabNumber={4} />}></Route>
        <Route path='household' element={<MapBase tabNumber={5} />}></Route>
        <Route path='graphpage' element={<Chartpage />}></Route>
        <Route path='newpage' element={<Newpage />}></Route>
    </Route>
</Routes>
</BrowserRouter>, 
document.getElementById("reactdiv"));