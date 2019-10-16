import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import CaribbeanReservation from './CaribbeanReservation'
import Tag from './CaribbeanReservation/Tag'
import { createTagText,getRandomColor } from './CaribbeanReservation/TagHelpers'
import './App.css';



function App() {


  const [newRes, setNewRes] = useState(null)
  const [addingRes, setAddingRes] = useState(false)

  const [tags, setTags] = useState([{ id: "xx", length: 13, row: 2, column: 8, class: "a-bit-tight", content: createTagText("This is a tag") }, { id: "xy", length: 4, row: 5, column: 12, style: { background: "red" } }])

  const [headRow, setHeadRow] = useState([<div onClick={()=>{changeHead.apply(this);console.log("this works")}} >123</div>, 1, 2, null, null, <div>123</div>]);

  for (var i = 0; i < headRow.length; i++) {
    console.log(headRow[i])
  }


  function changeHead(){
    var newHead = [...headRow];
    newHead[0] = <div>James</div>;

    setHeadRow(newHead);
  }

  useEffect(()=>{
    console.log(headRow)
  },[headRow])

  function makeid() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

  }



  function createRes(row, column) {
    var newres = { id: makeid(), length: 1, row: row, column: column, isNew: true,style:{background:getRandomColor()} };
    setAddingRes(true)
    setNewRes(newres)
    setTags([...tags, newres]);

  }

  function continueRes(row, column) {
    if (newRes !== null) {

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
    console.log("done")
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




  function mouseOverTag(id){

    if(newRes && newRes.id !== id){
     endRes();
    }


  }



  return (
    <div id="main-app" className="App">
      <div></div>
      <div id="tag-list" style={{ display: "inline-block" }}>{tags.map((tag) => {

        return <div>{tag.id}</div>
      })}
      </div>
      <CaribbeanReservation
        style={{ display: "inline-block" }}
        rowTitles={["Golf Cart 1",null,"Golf Cart 2", ]}
        rowTitleWidth={80}
        headRow={headRow}
        isAdding={addingRes}
        end={endRes.bind(this)}
        continue={continueRes.bind(this)}
        create={createRes.bind(this)}
        width={600}
        height={30} 
        
        >


        {tags.map((tag) => {


          return <Tag key={tag.id} onMouseOver={mouseOverTag.bind(this)}   {...tag} />
        })}
      </CaribbeanReservation>

    </div>
  );
}

export default App;
