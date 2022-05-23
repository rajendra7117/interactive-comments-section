import React from 'react'

const DateConversion = ({createdDate, ownComment, reply}) => {
   let today = new Date()
 
   let oldDate = new Date(createdDate)
  
  let dateTODisplay
  if(oldDate.getFullYear() === today.getFullYear()){
    
    if(oldDate.getMonth()===today.getMonth()){
        if(oldDate.getDate()===today.getDate()){
              if(oldDate.getHours()===today.getHours()){
                  if(oldDate.getMinutes===today.getMinutes()){
                        dateTODisplay = ` ${today.getSeconds()-oldDate.getSeconds()} seconds ago`
                  }
                  else{
                    dateTODisplay = ` ${today.getMinutes()-oldDate.getMinutes()} minutes ago`
                  }
              }
              else{
                dateTODisplay = ` ${today.getHours()-oldDate.getHours()} hours ago`
              }
        }
        else{
         dateTODisplay = ` ${today.getDate()-oldDate.getDate()} days ago`
        }
    }
    else{
      dateTODisplay=`${today.getMonth()-oldDate.getMonth()} month ago`
    }
  }
  else{
    dateTODisplay = today.getFullYear()-oldDate.getFullYear()
  }
    
  return (
    <span className='date'>{dateTODisplay}</span>
  )
}

export default DateConversion