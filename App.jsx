import logo from './logo.svg';
import './App.css';
import Appbar from './component/Appbar';
import PopularMovie from './component/Popularmovie';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopRated from './component/TopRated';
import Upcomming from './component/Upcomming';
import ViewMovie from './component/ViewMovie';
import ViewToprated from './component/ViewToprated';
import ViewPopular from './component/ViewPopular';
import SearchResults from './component/SearchResult';


function App() {
  return (
    <div className="App">
     
    

    <Router>
    <Appbar/>
         
         <Routes>
           <Route index path="/popular" element={<PopularMovie />} />
           <Route path="/popular/:id" element={<ViewPopular />} />
           <Route path="/search" element={<SearchResults />} />
           <Route path="/toprated" element={<TopRated />} />
           <Route path="/toprated/:id" element={<ViewToprated />} />
           <Route path="/upcoming" element={<Upcomming />} />
           <Route path="/upcoming/:id" element={<ViewMovie />} />

         
         </Routes>
       </Router>

    </div>
  );
}

export default App;
