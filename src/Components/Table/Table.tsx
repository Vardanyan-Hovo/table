import React, { useState,useEffect ,memo} from 'react';
import { Button } from 'primereact/button';
import { TreeNode } from 'primereact/treenode';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
// name: string;  Bud
interface TreeNodeS extends TreeNode{
  name: string;
  id: string;
  title: string;
  postId: string;
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

  const [state, setState] = useState<TreeNodeS[]>(init);
  const [error, setError] = useState<Error | undefined>();

    async function syncron(question:string ){
      try {
          const response = await fetch(API + question); // Replace with your API uRL
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();

          setState(data);
      } 
      catch (error:Error | any) {
          setError(error);
      }
    }
    useEffect(()=>{
      syncron(question);
    },[question])

    let columData;
    let arr;
    if (Array.isArray(state))
    {
      columData = Object.keys(state[0])
      arr = state;
    }
    else
    {
      columData = Object.keys(state);
      setState([state])
      arr = [state]
    }

    console.log(columData)
    return (
      <div>
        {error ? (
          <p>Error fetching data: {error.message}</p>
        ) : state ? (
          <DataTable value={arr}>
                {
                  columData.map((value,key)=>{
                    // console.log("value  ==" + JSON.stringify(value));
                    return(<Column key={key} field={value} header={value} ></Column>)
                  })
                }
          </DataTable>
        ) : (
          <p>Loading...</p>
        )}
        <div className='flex'>
          <Button className=' ml-6' onClick={()=>{
            navigation("/")
          }}>Home</Button>
        </div>
      </div>
    );
})

export default TableAll;
