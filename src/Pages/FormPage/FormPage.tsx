import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import "./FormPage.css";


const API = "http://localhost:3000/"


const FormPage: React.FC = () => {
    const [isComplete, setComplete] = useState(false);
    const [keyNev, setkeyNev] = useState("");
    const [valueNev, setValueNev] = useState("");
    const [post, setPost] = useState("post");
    const [error, setError] = useState("");
    const [keyValuePairs, setKeyValuePairs] = useState({}); // State for key-value pairs


    const navigate = useNavigate();


    //set check disable
    useEffect(()=>{
        Object.entries(keyValuePairs).forEach(([key, value]) => {
            // console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
            if (
                !value ||
                (typeof value === 'string' && value.trim() === '') || // Check if value is a string and empty
                (typeof value === 'object' && Object.keys(value).length === 0) // Check if value is an object and empty
              ) {
                setComplete(false);
                return;
              }
          });
        Object.keys(keyValuePairs).forEach((e:string, value)=>{
            if (!value)
            {
                setComplete(false)
                return
            }
        })
        Object.keys(keyValuePairs).length ? setComplete(true): setComplete(false)
    },[keyValuePairs])



    const handleFavorites: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();

        async function requestPost(){
            try {
                const response = await fetch(API + post); // Replace with your API uRL
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                navigate('/home');
            } 
            catch (error:Error | any) {
                setError(error);
            }
          }

        await requestPost();

    };

    const ChangeInput = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
        if(!key)
            return;
        setKeyValuePairs({
            ...keyValuePairs,
            [key]: event.target.value, // Use the key parameter to set the value dynamically
        });
        setError("");
    };

    const handleAddPair = () => {
        if(!keyNev)
            return;
        setKeyValuePairs({
            ...keyValuePairs,
            [keyNev]: valueNev, // Use the keyNev and valueNev states to add a new key-value pair
        });
        setkeyNev(""); // Reset the keyNev state after adding the pair
        setValueNev(""); // Reset the valueNev state after adding the pair
        setError("");
    };

    return (
        <div className='max-w-full'>
            <div id='formHead'>
                <h4>Form Page</h4>
                <h3>{error + ""}</h3>
                <form className='flex flex-col' id='form'>
                    <div>
                        <InputText type="text" placeholder="method" value={post} onChange={()=>{
                            setPost(post);
                        }}/>
                    </div>

                    <h4>Data input '{'key:value'}' pair</h4>
                    <div>
                        <InputText type="text" placeholder="key" value={keyNev} onChange={(e) => setkeyNev(e.target.value)} />
                        <InputText type="text" placeholder="value" value={valueNev} onChange={(e) => setValueNev(e.target.value)} />
                    </div>
                    <button type="button" onClick={handleAddPair}>Add Key-Value Pair</button>
                    
            

                    {Object.entries(keyValuePairs).map(([key, value]) => (
                        <div key={key} className='flex text-center justify-center items-center'>
                            <div>{key}</div>
                            <InputText className='ml-2'
                                type="text"
                                placeholder="value"
                                value={value + ""}
                                onChange={(e) => ChangeInput(e, key)}
                            />
                        </div>
                    ))}

                    <Button type="button" icon="pi pi-check" disabled={!isComplete} onClick={handleFavorites} className="bg-sky-500 w-2">
                        Submit
                    </Button>
                </form>
            </div>
            <div className='flex'>
                <Button className='ml-6 disabled:false' onClick={() => navigate("/")}>
                    Home
                </Button>
            </div>
        </div>
    );
};

export default FormPage;