import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';


const FormPage: React.FC = () => {
    const navigate = useNavigate();

    const handleFavorites: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        navigate('/home');
        console.log("  navigate('/table');")
    };
    
    return (
        <div>
            <h4>Form Page</h4>
            <form>
                <input type="text" placeholder="Username" />

                <InputText/>
                <Button type="button"  icon="pi pi-check" onClick={handleFavorites} className="bg-sky-500 w-1">
                    Submit
                </Button>
            </form>
        </div>
    );
}

export default FormPage;