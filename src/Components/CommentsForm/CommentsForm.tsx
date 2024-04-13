import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./CommentsForm.css";
import { Button } from "primereact/button";

type ErrorHandlFunction = (error: Error | any) => void;

//    { "id": "1", "text": "a comment about post 1", "postId": "1" },
function CommentsForm({api, errorHandl}:{api:string, errorHandl:ErrorHandlFunction})
{
    const [id, setId] = useState("");
    const [text, setText] = useState("");
    const [postId, setPostId] = useState("");
    const [isComplete, setComplete] = useState(false);

    const navigate = useNavigate();


    async function submithandle(){
        if (id && text)
        {
            try {
                const response = await fetch(api + "comments",{
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        id,
                        text,
                        postId
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
            setText("");
            setId("");
            setPostId("")
        }
    }
    function disableHandle(){
        if(id && text)
        {
            console.log(`tttttt id=[${id}] text=[${text}]` )
            setComplete(true)
        }
        else
        {
            console.log(`fffffff id=[${id}] text=[${text}]` )
            setComplete(false)
        }
    }
    async function idHandl(text:string){
        setId(text);
        errorHandl("");
        disableHandle();
    }
    function textHandl(text:string){
        setText(text);
        errorHandl("");
        disableHandle();
    }
    function postIdHandl(text:string){
        setPostId(text);
        errorHandl("");
        disableHandle();
    }
    return(
        <>
        <h1>
            Comments
        </h1>
            <div className="flex h-60 overflow-scroll" id="postForm">
                <div className="flex-1 mr-2" id="idForm">
                    <label htmlFor="firstname5" className="sr-only">  id</label>
                    <input id="firstname5" type="number" className="text-base text-gray-700 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary-500" placeholder="   id"
                       value={id}
                       onChange={(e)=>{
                            idHandl(e.target.value)
                        }}/>
                </div>
                <div className="flex-1 mr-2 " id="text">
                    <label htmlFor="lastname5" className="sr-only">text</label>
                    <input id="lastname5" type="text" className="text-base text-gray-700 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary-500" placeholder="text"
                        value={text}
                        onChange={(e)=>{
                            textHandl(e.target.value)
                        }}
                    />
                </div>
                <div className="flex-1 mr-2 " id="postId">
                    <label htmlFor="lastname5" className="sr-only">postId</label>
                    <input id="postIdComments" type="text" className="text-base text-gray-700 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary-500" placeholder="postId"
                        value={postId}
                        onChange={(e)=>{
                            postIdHandl(e.target.value)
                        }}
                    />
                </div>
                <Button type="button"
                    name="submitComments"
                 className="bg-primary border border-primary-500 px-3 py-2 text-base rounded-md cursor-pointer transition-all duration-200 hover:bg-primary-600 hover:border-primary-600 active:bg-primary-700 active:border-primary-700"
                   disabled={!isComplete}
                    onClick={()=>{
                        submithandle();
                    }}
                >Submit</Button>
            </div>
        </>
    )
}

export default CommentsForm;
