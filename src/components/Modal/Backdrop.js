import React from "react";
import { useSelector, useDispatch } from "react-redux";

const Backdrop = () => {

    const errorNum = useSelector(state => state.quote.errorNum)

    const start = useSelector(state => state.quote.start)
    
    const numOfLetters = useSelector(state => state.quote.numOfLetters)

    const scoreNum = useSelector(state => state.quote.scoreNum)

    return <div className='Backdrop' style={{display: errorNum === 6 || start || (numOfLetters === scoreNum && numOfLetters > 0) ? 'block' : 'none'}}></div>

}

export default Backdrop