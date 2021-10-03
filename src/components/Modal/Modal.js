import React, { Fragment, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuoteData } from "../../store/quote-actions";
import { quoteActions } from "../../store/quote";
import Backdrop from "./Backdrop";
import TotalScore from "./TotalScore";

const Modal = () => {

    const errorNum = useSelector(state => state.quote.errorNum)

    const numOfLetters = useSelector(state => state.quote.numOfLetters)

    const scoreNum = useSelector(state => state.quote.scoreNum)

    const start = useSelector(state => state.quote.start)

    const dispatch = useDispatch()

    const refValue = useRef('')

    return (

        <div className='Modal' style={{display: errorNum === 6 || start || (numOfLetters === scoreNum && numOfLetters > 0) ? 'flex' : 'none'}}>

            {
                start ? 

                <Fragment>

                    <h4>Choose your username</h4>

                    <input ref={refValue} />

                    <button className='StartBtn' onClick={(e) => {dispatch(quoteActions.setStart(refValue.current.value));}}>Start the game</button>

                </Fragment>

                :

                (numOfLetters === scoreNum) && numOfLetters > 0 ?

                <Fragment>

                <h4>Congratulations you won!</h4>

                <TotalScore />

                <button className='StartBtn' onClick={(e) => {dispatch(fetchQuoteData()); dispatch(quoteActions.setReset());}}>Play again</button>

                </Fragment>

                :

                <Fragment>

                <h4>You lost.</h4>

                <button className='RestartBtn' onClick={(e) => {dispatch(fetchQuoteData()); dispatch(quoteActions.setReset());}}>Restart</button>

                </Fragment>
            }

        </div>

    )

}

const ModalWithBDrop = () => {

    return (

        <Fragment>
            <Backdrop />
            <Modal />
        </Fragment>

    )

}

export default ModalWithBDrop