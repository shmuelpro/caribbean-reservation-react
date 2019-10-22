import React, { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import CaribbeanReservation from './CaribbeanReservation'
import Tag from './CaribbeanReservation/Tag'
import { usePrevious,makeid } from './CaribbeanReservation/helpers'
import { createTagText, getRandomColor } from './CaribbeanReservation/TagHelpers'

import './App.css';



function App() {


  const [newRes, setNewRes] = useState(null)
  const [addingRes, setAddingRes] = useState(false)
  const [displayState, setDisplayState] = useState("af")

  const [tags, setTags] = useState([{ draggable: true, id: "xx", length: 13, row: 2, column: 8, className: "a-bit-tight", content: createTagText("This is a tag") }, { id: "xy", length: 4, row: 5, column: 12, style: { background: "red" } }])

  const [headRow, setHeadRow] = useState([<div onClick={() => { changeHead.apply(this); console.log("this works") }} >123</div>, 1, 2, null, null, <div>123</div>]);
  const [content, setContent] = useState({
    "r0c0": <span style={{ background: "green", width: "20px", height: "20px", display: "block" }}></span>
  });



  const a = useRef({ r: -1, c: -1 });

  const [startedChange, setStartedChange] = useState(false);


  const [changedContent, setChangedContent] = useState({ r: -1, c: -1 });
  //const a = useTimeout(changedContent,25)
  const prevChangeContent = usePrevious(changedContent);

  const [height, setHeight] = useState(30)


  function changeHead() {
    var newHead = [...headRow];
    newHead[0] = <div>James</div>;

    setHeadRow(newHead);
  }

  useEffect(() => {

    if(startedChange){
   
        const timer = setTimeout(() => {
          
          setStartedChange(false);
          setChangedContent(a.current);
        }, 5);
        
        
        return () => clearTimeout(timer);
    
    }

  }, [startedChange])


  useEffect(() => {

      var newContent = { ...content };

      if(prevChangeContent){
        var prevChange = formatRowColumn(prevChangeContent.r, prevChangeContent.c)
        delete newContent[prevChange];
      }

      var newChange = formatRowColumn(changedContent.r, changedContent.c)
      newContent[newChange] = (<span style={{ background: "green", width: "20px", height: "20px", display: "block" }}></span>);
      setContent(newContent)   

  }, [changedContent])

  function formatRowColumn(r, c) {

    return `r${r}c${c}`;


  }








  function createRes(row, column) {
    var newres = { id: makeid(), length: 1, row: row, column: column, isNew: true, style: { background: getRandomColor() } };
    setDisplayState("Creating tag " + newres.id)
    setAddingRes(true)
    setNewRes(newres)
    setTags([...tags, newres]);

  }

  function continueRes(row, column) {
    if (newRes !== null) {
      setDisplayState("Still creating " + newRes.id)
      var editingRes = { ...newRes };

      evaluatePosition(editingRes, column);
      setNewRes(editingRes)
      switchRes(editingRes)





    }
  }


  function endRes(row, column) {

    var editingRes = { ...newRes };
    editingRes.isNew = false;
    switchRes(editingRes)
    setAddingRes(false);
    setDisplayState("all done " + newRes.id)
  }

  function evaluatePosition(editingRes, column) {
    editingRes.length = Math.abs(column - editingRes.column + 1);

    if (editingRes.column > column) {
      editingRes.column = column;
    }

  }

  function switchRes(editingRes) {
    var index = tags.findIndex((tag) => tag.id === editingRes.id);

    var newTags = [...tags]
    newTags[index] = editingRes;
    setTags(newTags);
  }

  function onDragOverCell(r, c) {



    

    if (a.current.r !== r || c !== a.current.c) {
      setStartedChange(true)
      a.current = { r, c };
      // setChangedContent({ r, c });


      // console.log(changedContent.current)
    }
  }





  function onDragEndCell(id, r, c) {


  }



  function mouseOverTag(id) {

    if (newRes && newRes.id !== id) {
      endRes();
    }


  }



  return (
    <div id="main-app" className="App">
      <div onClick={() => { setHeight(height + 1) }} >{displayState}</div>
      <div id="tag-list" style={{ display: "inline-block" }}>{tags.map((tag) => {

        return <div>{tag.id}</div>
      })}
      </div>
      <CaribbeanReservation
        style={{ display: "inline-block" }}
        rowTitles={["Golf Cart 1", null, "Golf Cart 2",]}
        rowTitleWidth={80}
        headRow={headRow}
        isAdding={addingRes}
        end={endRes.bind(this)}
        continue={continueRes.bind(this)}
        create={createRes.bind(this)}
        width={600}
        height={height}
        onDragOver={(r, c) => { onDragOverCell(r, c) }}
        content={content}

      >


        {tags.map((tag) => {



          return <Tag key={tag.id} onDragEnd={onDragEndCell.bind(this)} onMouseOver={mouseOverTag.bind(this)} onContextMenu={(e) => { e.preventDefault(); console.log(`right clicked ${tag.id}`) }}  {...tag} />
        })}
      </CaribbeanReservation>

    </div>
  );
}

export default App;