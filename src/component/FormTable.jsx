import React from 'react'
import '../App.css'
import { IoMdClose } from 'react-icons/io'

export default function FormTable({handleSubmit,handleOnChange,handleclose, rest}) {
  return (
    <>
            <div className='addContainer'>
              <form onSubmit={handleSubmit}>
              <div className='close-btn' onClick={handleclose}><IoMdClose /></div>

                <label htmlFor='name'>Name:</label>
                <input
                  type='text'
                  id="name"
                  name="name"
                  onChange={handleOnChange}
                  value={rest.name}
                />

                <label htmlFor='email'> email</label>
                <input
                type='email'
                id="email"
                name="email"
                onChange={handleOnChange}
                value={rest.email}
                />

                <label htmlFor='mobile'> mobile</label>
                <input
                type='text'
                id='mobile'
                name='mobile'
                onChange={handleOnChange}
                value={rest.mobile}
                />

                <button className='btn'>Submit</button>
              </form>
        </div>
    </>
  )
}
