import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from './components/Layout';
import { fetchQuoteData } from './store/quote-actions'

function App() {

  const dispatch = useDispatch()
  
  useEffect(()=>{

    dispatch(fetchQuoteData())

  }, [dispatch])
  
  return (
    <div className="App">

      <Layout />

    </div>
  );
}

export default App;
