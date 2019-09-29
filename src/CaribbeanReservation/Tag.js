import React, { useEffect, useState } from 'react';





export default function Tag(props) {

    return (<div onClick={props.onClick} onMouseOver={props.onMouseOver} style={props.style} className={props.className} >
        {
            [...Array(props.length)].map((x, i) => {
                return <div key={i} style={{ width: props.dimension, height: props.dimension, pointerEvents: "none" }}></div>
            })
        }
        {props.content}  


    </div>)

}

Tag.defaultProps={
    dimension: 20,
}


Tag.displayName = "tag";