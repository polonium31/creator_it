import React from 'react'
import { Card } from "./Card"
import Data from "./ItemData"

export const Item = () => {

  return (
    <>

      <div className='container-fluid mb-5 main'>
        <div className='row'>
          <div className='col-10 mx-auto'>
            <div className='row gy-4'>
              {Data.map((item, idx) => {
                return <Card key={idx} imgsrc={item.imgsrc} title={item.title} desc={item.desc} />
              })}
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  )
}
