import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
export default function Head(props) {


   
    return (<div className="caribbean-row" id="head">


    {props.hasRowTitle?<div className="row-cell" style={{width:props.rowTitleWidth,height: props.dimension + "px"}}/>:""}


       { props.headRow.map((headitem,i) => {
            return <div key={i} style={{ width: props.dimension + "px", height: props.dimension + "px" }} className="row-cell">{headitem}</div>;
        })
    }</div>)

}