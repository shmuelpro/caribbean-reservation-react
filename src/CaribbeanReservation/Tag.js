import React, { useEffect, useState } from 'react';





export default function Tag(props) {


  


    return (<div style={props.style} className={"tag " + props.class} >
        {
            [...Array(props.length)].map((x, i) => {
                return <div key={i} style={{ width: props.dimension, height: props.dimension, pointerEvents: "none" }}></div>
            })
        }



    </div>)

}