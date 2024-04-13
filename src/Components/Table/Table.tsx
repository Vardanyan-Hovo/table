import React, { useState,useEffect ,memo, useCallback} from 'react';
import { Button } from 'primereact/button';
import { TreeNode } from 'primereact/treenode';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import "./Table.css";
import {useRef} from 'react';

// name: string;  Bud
interface TreeNodeS extends TreeNode{
  name: string;
  id: string;
  title: string;
  postId: string;
}

interface ErrorHandl{
  message:string
}

const init:TreeNodeS[] = [
      { name: 'Kara', id: 'data', title: "100", postId: 'Folder' },
      { name: 'Kara', id: 'Pictures', title: "200", postId: 'Folder' },
      { name: 'Kara', id: 'Videos', title: "300", postId: 'Folder' }
]


//"https://github.com/typicode/json-server";
const API = "http://localhost:3000/"

interface TableAllProps {
  question: string;
}

const TableAll = memo(function TableAll({ question }:TableAllProps){
  const navigation = useNavigate();
  let errorA  = useRef<Error | ErrorHandl | any>();
  const [state, setState] = useState<TreeNodeS[] | any>(init);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | boolean>(false);
  let idprivat = useRef< NodeJS.Timeout>()

  const syncron = useCallback(async function (question:string ){
                        try {
                            const response = await fetch(API + question); // Replace with your API uRL
                            if (!response.ok) {
                              throw new Error(`HTTP error! status: ${response.status}`);
                            }
                            const data = await response.json();

                            setState(data);
                        } 
                        catch (error:Error | any) {
                          errorA.current = error;
                        }
                   }, []);
  
  useEffect(()=>{
    syncron(question);
  },[question,syncron])

  useEffect(() => {
    if (intervalId)
    {
      idprivat.current = setInterval(() => {
        console.log(question + "  ")
        syncron(question);
      }, 1000);
    }
    else
      clearInterval(idprivat.current)

    return () => clearInterval(idprivat.current);
  }, [intervalId, question, syncron]); // Dependency on intervalRunning
  
  
  const infinityStart = () => {
    setIntervalId(true);
  }
  const infinityStope=() =>{
    setIntervalId(false);
  }

  let columData;
  let arr;
  errorA.current = "";

  if (Array.isArray(state) && !errorA.current)
  {
    columData = Object.keys(state[0])
    arr = state;

    let count = Object.keys(arr[0]).length;
   

    if (!arr ||  arr.length  < 1)
    {
      errorA.current = {message : "data not found"}
    }
    
    if(!arr || count < 5 || count > 15)
    {
      errorA.current = {message:"A table that can contain an arbitrary number of fields (from 5 to 15)."};
    }
  }
  else if (!errorA.current)
  {
    
    columData = Object.keys(state);
    debugger
    setState([state])

    arr = [state]
  }

  return (
    <div>
      {errorA.current ? (
        <p id="errorTable">Error fetching data: {errorA.current.message}</p>

       ): state ? (
        <DataTable value={arr}>
              {
                columData?.map((value,key)=>{
                  // console.log("value  ==" + JSON.stringify(value));
                  return(<Column key={key} field={value} header={value} ></Column>)
                })
              }
        </DataTable>
      ) : (
        <p>Loading...</p>
      )}
      <div className='flex'>
        <Button className=' ml-6' 
          name="tableGoHome"
          onClick={()=>{
          navigation("/")
        }}>Home</Button>
      </div>
      <div>
          <Button className=' ml-6' id='infstart' onClick={ ()=>{
            infinityStart();
        }}>Infinity Syncron Start</Button>
        <Button className=' ml-6' id='infstop' onClick={ ()=>{
            infinityStope();
        }}>Infinity Syncron Stop</Button>
      </div>
    </div>
  );
})

export default TableAll;
