import React from 'react'
import Typography from '@material-ui/core/Typography';

function GreetComponent() {
    const currentGreetTime = () =>{
        let today = new Date()
        let curHr = today.getHours()
        
        if (curHr < 12) {
          return('Morning')
        } else if (curHr < 18) {
          return('Afternoon')
        } else {
          return('Evening')
        }
    }
    return (

        <Typography gutterBottom variant="h5" component="h2">
            {"Hey Good " + currentGreetTime()}
        </Typography>
    )
}

export default GreetComponent
