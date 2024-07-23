// import React, { useState } from 'react'
// import { Button, Form } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom'
// function SearchBox() {
//     const [keyword, setKeyword] = useState('')
    
//     const navigate = useNavigate()
//     const submitHandler = (e) => {
//         e.preventDefault()
//         if(keyword){
//             const trimmedKeyword = keyword.trim();
//             navigate(`/?keyword=${trimmedKeyword}`);       
//          }
//         else{
//             navigate(-1) //navigating to previous  page
            
//         }
       
//     }
//     return (
//         <Form onSubmit={submitHandler} className='d-flex'>
//             {/* //Inline Form Layout: When the inline prop is added to the <Form> component, it changes the display to inline, meaning the form elements will be arranged horizontally in a single line. */}
//             <Form.Control
//                 type='text'
//                 name='q'
//                 onChange={(e) => setKeyword(e.target.value)}
//                 className='mr-sm-2 ml-sm-5'
//             ></Form.Control>

//             <Button
//                 type='submit'
//                 variant='outline-success'
//                 className='p-2'
//             >
//                 Submit
//             </Button>
//         </Form>
//     )
// }

// export default SearchBox



import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SearchBox() {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

   
    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            navigate(`/?keyword=${keyword}&page=1`);
        } else {
            navigate(-1)
        }
    };

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            />
            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >
                Submit
            </Button>
        </Form>
    );
}

export default SearchBox;
