import 'antd/dist/reset.css';
import './App.css';
import { DatePicker } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBucket, createCard, getBuckets, getCardItems } from './utils/cardSlice';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router';
import Dashboard from './views/Dashboard';
import Buckets from './views/Buckets';
import History from './views/History';


function App() {
  const { isLoading } = useSelector((store) => store.card);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBuckets());
  }, [])

  useEffect(() => {
    console.log("loading state changed", isLoading)
  }, [isLoading])

  return (
    <>
      {isLoading &&
        <Loader />
      }
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/buckets' element={<Buckets />} />
        <Route path='/history' element={<History />} />
      </Routes>
    </>
  );
}

export default App;
