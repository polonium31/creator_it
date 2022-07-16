import React from 'react'

export const ContactForm = () => {
  return (
    <>
    <br />
      <div className="container">
        <div className="row justify-content-start align-items-center " style={{marginTop:"-5%"}}>
          <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-3" >
            <br />
            <iframe style={{boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px", paddingTop:"10px", paddingBottom:"10px", borderRadius:"15px"}} src="https://docs.google.com/forms/d/e/1FAIpQLSd3kFUE7UDxFEbTfgb16bLeg0eNu4iY4FBLBZiEXnRZxGPetA/viewform?embedded=true" width="840" height="840" scrolling="no" frameborder="0" marginheight="1" marginwidth="1">Loading…</iframe>
            <br />
          </div>
        </div>
      </div>
      <br /><br /><br />
    </>
  )
}
