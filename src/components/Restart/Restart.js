import React from "react";
import { useDispatch } from "react-redux";
import { fetchQuoteData } from "../../store/quote-actions";
import { quoteActions } from "../../store/quote";

const Restart = () => {

    const dispatch = useDispatch()

    return (

        <button className='RestartBtn' onClick={(e) => {

            dispatch(fetchQuoteData()); 
            dispatch(quoteActions.setReset());

        }}>

            Restart
        </button>

    )

}

export default Restart