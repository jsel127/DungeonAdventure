import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NameSelection = () => {

    // I'm using useNavigate instead of Link for this page because
    // the button is being used as part of the text input form. 
    // I can't figure out how to get the button to act as a Link and
    // get it to submit the form at the same time. 
    const navigate = useNavigate()

    function handleSubmit(e) {

        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())

        console.log('NameSelection:', formJson)

        fetch('/api/selected-name', {
            method: 'POST', 
            headers: {
              'content-type': 'application/json'
            },
            body: JSON.stringify(formJson)
          }).then(res => {
            return res.json()
          }).catch(error => console.log('ERROR: select name post request'))

          navigate('/select-difficulty')

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Enter a name for your adventurer: <input name="heroName" />
                </label>
                <button type="submit">Next</button>
            </form>
        </> 
    )

}

export default NameSelection