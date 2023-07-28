import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { Layout } from './components/Layout';
import { Home } from './Pages/Home'
import { Product } from './Pages/Product';
import {Category} from './Pages/Category';
import { Purchase } from './Pages/Purchase';
import {Settings} from './Pages/Settings'




function App() {
  return<>
<BrowserRouter>
<Routes>
<Route path="/" element={<Layout />}>
  <Route index element={<Home />} />
  <Route path='/Product' element={<Product/>} />
  <Route path='/Category' element={<Category/>} />
  <Route path='/Purchase' element={<Purchase />}/>
  <Route path='/Settings' element={<Settings />} />
</Route>
</Routes>
</BrowserRouter>

</>
  
}

export default App;
