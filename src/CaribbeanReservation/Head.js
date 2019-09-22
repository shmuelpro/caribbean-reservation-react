import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
export default function Head(props) {

    return (<div className="caribbean-row" id="head">{
        props.headRow.map((headitem) => {
            return <div style={{ width: props.dimension + "px", height: props.dimension + "px" }} className="row-cell">{headitem}</div>;
        })
    }</div>)

}