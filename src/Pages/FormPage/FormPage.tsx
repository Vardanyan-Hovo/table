import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from 'react-router-dom';
import PostForm from '../../Components/PostForm/PostForm'
import "./FormPage.css";
import CommentsForm from '../../Components/CommentsForm/CommentsForm';
import ProfilForm from '../../Components/ProfilForm/ProfilForm';
import { useSpring, animated } from 'react-spring';

const API = "http://localhost:3000/"


const FormPage: React.FC = () => {
    const [isComplete, setComplete] = useState(true);
    const [keyNev, setkeyNev] = useState("");
    const [valueNev, setValueNev] = useState("");
    const [post, setPost] = useState("posts");
    const [error, setError] = useState("");
    const [keyValuePairs, setKeyValuePairs] = useState({}); // State for key-value pairs
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const navigate = useNavigate();

    const popupAnimation = useSpring({
        opacity: showPopup ? 1 : 0,
        transform: showPopup ? 'translateY(0%)' : 'translateY(100%)'
    })
    
    const togglePopup = () => {
        setShowPopup(prevState => !prevState);
    };

    function errorHandl(error:Error | any){
        setError(error);
    }
    //set check disable
    useEffect(()=>{
        Object.entries(keyValuePairs).forEach(([key, value]) => {
            console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
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
                console.log({...setKeyValuePairs})
                const response = await fetch(API + post,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ...setKeyValuePairs
                    })
                })
                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                navigate('/home');
            } 
            catch (error:Error | any) {
                errorHandl(error);
            }
          }

        await requestPost();

    };

    const ChangeInput = (event: React.ChangeEvent<HTMLInputElement>, key: string) => {
        if(!key)
            return;
        console.log({...setKeyValuePairs})
        setKeyValuePairs({
            ...keyValuePairs,
            [key]: event.target.value, // Use the key parameter to set the value dynamically
        });
        setError("");
    };

    const handleAddPair = () => {
        if(!keyNev || !valueNev)
            return;
            console.log({...setKeyValuePairs})
        debugger
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
                <h4>Reusable Survey Form GET</h4>
            <div id='formHead'>
                <h3 id="errorRespons" className=' text-center text-red-500'>{error + ""}</h3>
                <Button name='Popup' onClick={togglePopup} style={{
                                                width: 80,
                                                height: 80,
                                                background: '#ff6d6d',
                                                borderRadius: 8
                                            }}
                        >Popup</Button>
             
                <form className=' bg-slate-500' id='form'>
                <animated.div style={popupAnimation} className="popup">
                    <div>
                        <h2>metod</h2>
                        <InputText id="InputTextMethod" type="text" placeholder="method" value={post} onChange={(e)=>{
                            setPost(e.target.value);
                        }}/>
                    </div>

                    <h2>Data input '{'key:value'}' pair</h2>
                    {
                        post && post==="posts" ?
                            (<div id='post'>
                                    <PostForm api={API} errorHandl={errorHandl}/>
                            </div>)
                            :  post && post=== "comments" ? (
                            <div>
                                <div>
                                    <CommentsForm api={API} errorHandl={errorHandl}/>
                                </div>
                            </div>

                        ) : post && post=== "profile" ? (
                            <div>
                                <div>
                                    <ProfilForm api={API} errorHandl={errorHandl}/>
                                </div>
                            </div>
                        ):
                         (<div id='oder'>
                                    <div>
                                        <InputText id="inputFormKey" type="text" placeholder="key" value={keyNev} onChange={(e) => setkeyNev(e.target.value)} />
                                        <InputText id="inputFormValue" type="text" placeholder="value" value={valueNev} onChange={(e) => setValueNev(e.target.value)} />
                                    </div>
                                    <Button type="button" name='AddKeyValuePair' onClick={handleAddPair} className=' mx-auto'>Add Key-Value Pair</Button>
                                    <div id='keyValue'>
                                        {
                                        Object.entries(keyValuePairs).map(([key, value]) => (
                                            <div id='item' key={key}>
                                                <h4 className=' text-center' id='outputHedr'>Add Key-Value Pair</h4>
                                                <div key={key} id="outputmain" >
                                                    <div id='keyinput' >
                                                        <div id='keyinputDiv'>
                                                            {key}
                                                        </div>
                                                    </div>
                                                    <InputText className='ml-2'
                                                        type="text"
                                                        placeholder="value"
                                                        value={value + ""}
                                                        key={key}
                                                        onChange={(e) => ChangeInput(e, key)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                <Button type="button" icon="pi pi-check" 
                                    disabled={!isComplete}
                                    name='buttonSubmitForm'
                                    onClick={handleFavorites} className="bg-sky-500 m-4">
                                    Submit
                                </Button>
                        </div>)
                    }
                    
                    </animated.div>
                </form>
                
            </div>
            <div className='flex'>
                <Button name='formToGoHome' className='ml-6 disabled:false' onClick={() => navigate("/")}>
                    Home
                </Button>
            </div>
        </div>
    );
};

export default FormPage;
