import React, {useState, useEffect} from 'react'

export const Footer = () => {
    const [date , setDate] = useState();

    const getYear = () =>  setDate(new Date().getFullYear())


    useEffect(() => {
        getYear();
    }, [])
  return (
    <>
     <div className='w-100 text-center' style={{paddingBottom:"2px"}}>
        <h5 >Copyright &copy; {date} Reserved to the developers of the site.</h5>
     </div>
    </>
  )
}
