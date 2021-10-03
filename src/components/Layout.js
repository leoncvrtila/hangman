import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Letters from "./Letters/Letters";
import Restart from "./Restart/Restart";
import GuessLines from "./GuessLines/GuessLines";
import LeaderBoard from "./LeaderBoard/LeaderBoard";
import Modal from "./Modal/Modal";
import { quoteActions } from "../store/quote";
import { rgx } from '../components/rgx'

const Layout = () => {

    const dispatch = useDispatch()

    const quote = useSelector(state => state.quote.quote)

    const clickedLetterHandler = (e, letter, lettersTransform) => {

        let newArray = [];
        let num = 0;

        for(let key in quote){

            newArray.push(
                {
                    value: quote[key].value,
                    status: quote[key].value === letter || quote[key].status === true ? true : false
                }
            )

            if(
                (quote[key].value === letter) && // if at least one value is true
                (!quote[key].value.match(rgx)) // if value isn't ".,:;"'"
            ){

                num += 1
                
            }

        }

        dispatch(quoteActions.setClickedLetter(letter))

        dispatch(quoteActions.setQuote({
            array: newArray,
            lettersTransform
        }))

        if(num === 0){ // if there is 0 hit letters - then add 1 error

            dispatch(quoteActions.setErrorNum(1))

        } else {

            dispatch(quoteActions.setScoreNum(num))

        }


    }

    return (

        <main>

            <Modal />

            <LeaderBoard />

            <GuessLines charArray={quote} />

            <Letters clickedLetterHandler={clickedLetterHandler} />

            <Restart />

        </main>

    )

}

export default Layout