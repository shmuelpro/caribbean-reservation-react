import React, { useEffect, useState, useLayoutEffect } from 'react';
import Tag from './Tag';
import Head from './Head';

import { prepareTag } from './TagHelpers';

export default function CaribbeanReservation(props) {



    const [rowCount, setRowCount] = useState(0);

    const [columnCount, setColumnCount] = useState(0);
    const [tags, setTags] = useState([]);

    
  
    

    useLayoutEffect(() => {

        var newTags = [];
        newTags = React.Children.map(props.children, (child) => {

            if (child.type.displayName === "tag") {


                var newProps = prepareTag({ ...child.props });

                return React.cloneElement(child, newProps);
            }
        })


        setTags(newTags);



    }, [rowCount, props.children])

    useEffect(() => {
        setColumnCount(getColumnCount());
    }, [props.width, props.dimension])

    useEffect(() => {
        setRowCount(props.height)

    }, [props.height])

  


    function getColumnCount() {
        var y = props.width / props.dimension;
        var x = Math.floor(y);

        return x;
    }


    function getContentFromMatrix(row, column) {

        if (props.content) {
            var r_content = props.content[row];
            var c_content = undefined;
            if (r_content) {
                c_content = r_content[column];
            }

            if (c_content) {

                return c_content;
            } else {
                return "";
            }

        }


    }

    function startCreateNew(r, c) {

        props.create(r, c);
    }

    function continueCreateNew(r, c) {
        if (props.isAdding) {
            props.continue(r, c)
        }
    }

    function endCreateNew(r, c) {
        if (props.isAdding) {
            props.end(r, c)

        }
    }

 


    return (<div id="grid" style={props.style} >
        <Head headRow={props.headRow} rowTitleWidth={props.rowTitleWidth} dimension={props.dimension} hasRowTitle={props.rowTitles.length > 0} />
        {[...Array(rowCount)].map((x, r) => {

            return <div className="caribbean-row" key={r}>


                <div className={`row-cell row${r}`}  style={{ width: props.rowTitleWidth, height: props.dimension + "px" }} > {props.rowTitles[r]} </div>



                {([...Array(columnCount)].map((x, c) => {


                    return <div onDragOver={(e) => { e.preventDefault(); props.onDragOver(r, c) }}
                        className="row-cell" id={`carribean_r${r}c${c}`}
                        onMouseEnter={() => { continueCreateNew(r, c) }}
                        onMouseDown={() => { startCreateNew(r, c) }}
                        onMouseUp={() => { endCreateNew(r, c) }}
                        style={{ width: props.dimension + "px", height: props.dimension + "px" }}
                        key={c}>
                        
                       {props.content[`r${r}c${c}`]}
                        
                        
                        </div>

                }
                ))}
            </div>

        }
        )}

        {tags}


    </div>)
}


CaribbeanReservation.defaultProps = {
    tags: [],
    headRow: [],
    rowTitles: [<div >what</div>],
    content: [],
    dimension: 20,
    width: 25,
    height: 1,
    rowTitleWidth: 35
}