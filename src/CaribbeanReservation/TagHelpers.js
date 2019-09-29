import { isObject } from './helpers';
import React from 'react';
export function prepareTag(tag) {           
    prepareStyle(tag);
    prepareClass(tag);
    return tag;
}

 function prepareStyle(tag){
   
    var position = getPosition(tag.row, tag.column);
    if(!position.top){
        position.top = 0;
    }

    if(!position.left){
        position.left = 0;


    }
    var style = {  top: position.top, left: position.left  };    

    if (isObject(tag.style)) {
        Object.assign(style, tag.style);
    }
    tag.style = style;
    
}

 function prepareClass(tag){

    var className = "tag";
    if(Array.isArray(tag.className)){
        className= className + ' '+  tag.className.join(' ');      
    }else if(typeof tag.className === "string"){     
        className= className + ' '+  tag.className;    
    }
 
    if(tag.isNew){
        className = className + " cant-select";
    }
    tag.className = className;
    

}



function getPosition(r, c) {
    let element = document.getElementById(`carribean_r${r}c${c}`);
    var position = {};
    if (element) {
        position = element.getBoundingClientRect();
    }
    return position;
}



export function createTagText(text){
      return( <span className="tag-content">{text}</span> )
}

