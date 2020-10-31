import React from 'react'
import {Card,CardContent,Typography} from "@material-ui/core";
import "./InfoBox.css"
function InfoBox({title,cases,total}) {
    return (
        <Card classname="infoBo">
            <CardContent>
                <Typography className='infotitle'>
                    {title}
                </Typography>
                  
                <Typography className='infocases'>
                    <h2>{cases}</h2>
                </Typography>

                {/* <Typography  className='infototal'>
                    {total}
                </Typography> */}
            </CardContent>
        </Card>
    )
}

export default InfoBox
