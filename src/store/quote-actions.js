import { quoteActions } from "./quote"

export const fetchQuoteData = () => {

    return async dispatch => {

        const fetchData = async () => {

            const response = await fetch('https://goquotes-api.herokuapp.com/api/v1/random?count=1')

            if(!response.ok){
                throw new Error('Could not fetch data!')
            }

            const data = await response.json()

            return data

        }

        try{

           const quoteData = await fetchData()

           dispatch(quoteActions.setQuote(quoteData.quotes[0]))

        }catch(error){

            dispatch(quoteActions.showNotification({
                status: 'error', 
                title: 'Error!', 
                message: 'Fetching data failed!'
              }))

        }
    }
}