import { isObject } from './helpers';
export function prepareTag(tag) {

       
    prepareStyle(tag);
    prepareClass(tag);

  

}

export function prepareStyle(tag){
    var style = {  pointerEvents: "none" };
    console.log(tag.style)
    if (isObject(tag.style)) {
        Object.assign(style, tag.style);
    }
    tag.style = style;
}

export function prepareClass(tag){

    var className = "tag";
    if(Array.isArray(tag.class)){
        className= className + ' '+  tag.className.join(' ');
    }else if(typeof tag.className === "string"){
        className= className + ' '+  tag.className;
    }
    tag.className = className;

}

