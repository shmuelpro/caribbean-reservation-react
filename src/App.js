import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import CaribbeanReservation from './CaribbeanReservation'
import './App.css';

function App() {

  
  const [newRes, setNewRes] = useState(null)
  const [addingRes, setAddingRes] = useState(false)
  
  const [tags, setTags] = useState([{ id: "xx", length: 3, row: 2, column: 8,class:"a-bit-tight" }, { id: "xy", length: 4, row: 5, column: 12,style:{background:"red"} }])

  const [headRow,setHeadRow] = useState([0,1,2]);

  function makeid() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 15; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;

  }



  function createRes(row,column) {
    var newres = { id: makeid(), length: 1, row: row, column: column };
    setAddingRes(true)
    setNewRes(newres)
    setTags([...tags, newres]);
    console.log(tags)
  }

  function continueRes(row, column) {
    if (newRes !== null) {

      var editingRes = {...newRes};

      evaluatePosition(editingRes,column);
      switchRes(editingRes)

 



    }
  }

  function evaluatePosition(editingRes,column){
    editingRes.length = Math.abs(column - editingRes.column+1);      

    if(editingRes.column > column){
      editingRes.column = column;
    }
    
  }

  function switchRes(editingRes){
    var index = tags.findIndex((tag) => tag.id === editingRes.id);

    var newTags = [...tags]
    newTags[index] = editingRes;
    setTags(newTags);
  }



 

  function endRes(row, column) {


    setAddingRes(false);
    console.log("done")
  }

  return (
    <div id="main-app" className="App">
      <div>This is a test</div>
      <CaribbeanReservation headRow={headRow} isAdding={addingRes} end={endRes.bind(this)} continue={continueRes.bind(this)} create={createRes.bind(this)} width={1500} tags={tags} height={30} />
    </div>
  );
}

export default App;
