import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./PostForm.css";
import { Button } from "primereact/button";

type ErrorHandlFunction = (error: Error | any) => void;

// { "id": "1", "title": "a title" },
function PostForm({api, errorHandl}:{api:string, errorHandl:ErrorHandlFunction})
{
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [isComplete, setComplete] = useState(false);

    const navigate = useNavigate();


    async function submithandle(){
        if (id && title)
        {
            // console.log(`id=[${id}]  title =[${title}] `)
            try {
                const response = await fetch(api + "posts",{
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        id,
                        title
                    })
                }); // Replace with your API uRL
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                navigate('/home');
            }
            catch (error:Error | any) {
                errorHandl(error);
            }
            setTitle("");
            setId("");
        }
    }
    function disableHandle(){
        if(id && title)
        {
            console.log(`tttttt id=[${id}] title=[${title}]` )
            setComplete(true)
        }
        else
        {
            console.log(`fffffff id=[${id}] title=[${title}]` )
            setComplete(false)
        }
    }
    async function idHandl(text:string){
        setId(text);
        errorHandl("");
        disableHandle();
    }
    function titleHandl(text:string){
        setTitle(text);
        errorHandl("");
        disableHandle();
    }
    return(
        <>
        <h1>
            POST
        </h1>
            <div className="flex h-60 overflow-scroll" id="postForm">

                <div className="flex-1 mr-2 pars" >
                    <label htmlFor="firstname5" className="sr-only">  id</label>
                    <input id="firstname5" type="number" name="IdPost" className="text-base text-gray-700 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary-500" placeholder="   id"
                       value={id}
                       onChange={(e)=>{
                            idHandl(e.target.value)
                        }}/>
                </div>
                <div className="flex-1 mr-2 pars">
                    <label htmlFor="lastname5" className="sr-only">title</label>
                    <input id="lastname5" type="text" name="titlePost" className="text-base text-gray-700 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary-500" placeholder="title"
                        value={title}
                        onChange={(e)=>{
                            titleHandl(e.target.value)
                        }}
                    />
                </div>
                <Button type="button" name="buttonPost" className="bg-primary border border-primary-500 px-3 py-2 text-base rounded-md cursor-pointer transition-all duration-200 hover:bg-primary-600 hover:border-primary-600 active:bg-primary-700 active:border-primary-700"
                   id="ButtonFormPost"
                   disabled={!isComplete}
                    onClick={()=>{
                        submithandle();
                    }}
                >Submit</Button>
            </div>
        </>
    )
}

export default PostForm;
