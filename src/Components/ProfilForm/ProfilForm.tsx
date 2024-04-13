import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "primereact/button";



type ErrorHandlFunction = (error: Error | any) => void;

// {"name": "typicode"}
function ProfilForm({api, errorHandl}:{api:string, errorHandl:ErrorHandlFunction})
{
    const [name, setName] = useState("");
    const [isComplete, setComplete] = useState(false);

    const navigate = useNavigate();


    async function submithandle(){
        if (name)
        {
            try {
                const response = await fetch(api + "profile",{
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name
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
            setName("");
        }
    }
    function disableHandle(){
        if(name)
        {
            console.log(`tttttt  name=[${name}]` )
            setComplete(true)
        }
        else
        {
            console.log(`fffffff name=[${name}]` )
            setComplete(false)
        }
    }

    function nameHandl(text:string){
        setName(text);
        errorHandl("");
        disableHandle();
    }
    return(
        <>
        <h1>
            POST
        </h1>
            <div className="flex h-60 overflow-scroll" id="postForm">
                <div className="flex-1 mr-2">
                    <label htmlFor="lastname5" className="sr-only">name</label>
                    <input id="lastname5" type="text" className="text-base text-gray-700 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-primary-500" placeholder="name"
                        value={name}
                        onChange={(e)=>{
                            nameHandl(e.target.value)
                        }}
                    />
                </div>
                <Button type="button" className="bg-primary border border-primary-500 px-3 py-2 text-base rounded-md cursor-pointer transition-all duration-200 hover:bg-primary-600 hover:border-primary-600 active:bg-primary-700 active:border-primary-700"
                   disabled={!isComplete}
                    onClick={()=>{
                        submithandle();
                    }}
                >Submit</Button>
            </div>
        </>
    )
}

export default ProfilForm;
