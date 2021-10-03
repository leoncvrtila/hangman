import React, { useState } from "react";
import { data } from "./Data";
import uppercase from '../../assets/images/uppercase.png'
import lowercase from '../../assets/images/lowercase.png'
import { useSelector } from "react-redux";

const Letters = (props) => {

    const [lettersTransform, setTransform] = useState(false)

    const lowerCase = useSelector(state => state.quote.lowerCase)
    const upperCase = useSelector(state => state.quote.upperCase)

    let finalData = []

    if(lettersTransform) { // transform text to upper case

        finalData = [...upperCase]

    } else { // transform text to lower case

        finalData = [...lowerCase]

    }

    const lettersTransformHandler = () => {

        setTransform(prevState => !prevState)

    }


    const mapLetters = finalData.map(l => {

        return (

            l.disabled ? // if letter is already clicked and macthed with letter in the quote

            <div key={l.letter} className='Letter' style={{background: '#8ec6e5', cursor: 'not-allowed'}} >
                {l.letter}
            </div>

            :

            <div key={l.letter} className='Letter' onClick={(e) => {props.clickedLetterHandler(e, l.letter, lettersTransform);}}>
                {l.letter}
            </div>

        )

    })

    return (

        <div className='LettersWrapp'>

            <div className='LettersTransform' onClick={lettersTransformHandler}>
                <img src={lettersTransform ? lowercase : uppercase} alt='Text transform' />
            </div>

            <div className='Letters'>
                {mapLetters}
            </div>

        </div>
    
    )

}

export default Letters