import React, { useEffect, useState, useLayoutEffect } from 'react';
import Tag from './Tag';
import Head from './Head';
import { isObject } from './helpers'
import { prepareTag } from './TagHelpers';

export default function CaribbeanReservation(props) {



    const [rowCount, setRowCount] = useState(0);

    const [columnCount, setColumnCount] = useState(0);
    const [tags, setTags] = useState([]);

    const [myrefs, setMyRefs] = useState([]);





    useLayoutEffect(() => {

        setTags(reevaluatePositions(props.tags))



    }, [rowCount, props.tags])

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

    function reevaluatePositions(tags) {

        var newTags = [...tags];

        newTags.map((tag) => {


            var position = getPosition(tag.row, tag.column);
            var newStyle = { top: position.top, left: position.left }
            if (isObject(tag.style)) {

                newStyle = Object.assign({ ...tag.style }, newStyle)
            }

            tag.style = newStyle;

            return tag;

        })

        return newTags
    }

    function getPosition(r, c) {
        let element = document.getElementById(`carribean_r${r}c${c}`);
        var position = {};
        if (element) {
            position = element.getBoundingClientRect();
        }
        return position;
    }




    return (<div id="grid" >
    <Head  headRow={props.headRow} rowTitleWidth={props.rowTitleWidth}  dimension={props.dimension} hasColumnTitle={props.columnTitle.length > 0}/>
        {[...Array(rowCount)].map((x, r) => {

            return <div className="caribbean-row" key={r}>


                <div className="row-cell" style={{width:props.rowTitleWidth,height: props.dimension + "px"}} > {props.columnTitle[r]} </div>



                {([...Array(columnCount)].map((x, c) => {


                    return <div className="row-cell" id={`carribean_r${r}c${c}`} onMouseEnter={() => { continueCreateNew(r, c) }} onMouseDown={() => { startCreateNew(r, c) }} onMouseUp={() => { endCreateNew(r, c) }} style={{ width: props.dimension + "px", height: props.dimension + "px" }} key={c}>{getContentFromMatrix(r, c)}</div>

                }
                ))}
            </div>

        }
        )}

        {props.tags.map((tag) => {

            prepareTag(tag);

            return <Tag key={tag.id} dimension={props.dimension} {...tag} />
        })}
    </div>)
}


CaribbeanReservation.defaultProps = {
    tags: [],
    headRow: [],
    columnTitle: [<div >sss</div>],
    content: [],
    dimension: 20,
    width: 25,
    height: 1,
    rowTitleWidth: 35
}