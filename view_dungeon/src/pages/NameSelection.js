import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const NameSelection = () => {

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
            <style>
                {`
                    body {
                        background-color: maroon;
                        color: white;
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }

                `}
            </style>

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <label>
                    Enter a name for your adventurer:
                </label>
                <input name="heroName" />
                <button type="submit">Next</button>
            </form>
        </>
    )

}

export default NameSelection
