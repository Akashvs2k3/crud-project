import { Route, BrowserRouter, Routes }from 'react-router-dom'
import Index from './Components/Authentication/Index';
import Expense from './Components/Expense-Tracker/Expense';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path='/' exact element={<Index/>}/>
      <Route path='/expense-tracker' element={<Expense/>}/>
      </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
