import React from 'react'
import { useParams } from 'react-router-dom';
import { SubCard } from "./SubCard"
import SubItemData from "./SubItemData"
export const SubItem = () => {
    const { Item } = useParams();
    const myJSON = JSON.stringify(Item);
    
    function alphaOnly(a) {
        var b = '';
        for (var i = 0; i < a.length; i++) {
            if ((a[i] >= 'A' && a[i] <= 'Z') || (a[i] >= 'a' && a[i] <= 'z') ) b += a[i];
        }
        return b;
    }
   
    function handleClick (c){
        if(c==="Youtube")
        {
            return 0;
        }
       if(c==="Instagram")
        {
            return 1;
        }
        if(c==="Twitter")
        {
            return 2;
        }
        if(c==="ALLInOne")
        {
            return 3;
        }
        if(c==="LinkedIn") 
        {
            return 4;
        }
        if(c==="OtherPlatform") 
        {
            return 5;
        }
      
     
      }
      const newStr =alphaOnly(myJSON);
      var x = handleClick(newStr);
      console.log(newStr);
    return (
        <>
            <div className='container-fluid mb-5' style={{ marginLeft: "10%",marginTop:"-3%" }}>
                <div className='row'>
                    <div className='col-10 mx-auto'>
                        <div className='row gy-4'>
                            {SubItemData[x].map((value, idx) => {
                                return <SubCard mainindex = {x} idx={idx} title={value.title} maintitle = {newStr} />
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
