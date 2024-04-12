import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const goToTable: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        navigate('/table');
        console.log("  navigate('/table');")
    };
    const goToForm: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        navigate('/form');
        console.log("  navigate('/table');")
    };

    return (
        <nav className='flex  ml-28  my-5 right-0'>
                <Button type="button" label="Table" className="mb-3 md:mb-0 bg-sky-500/100 w-28 hover:bg-sky-50 mr-2" onClick={goToTable}></Button>
                <Button type="button" label="Form" className="p-button-secondary mb-3 md:mb-0 bg-sky-500/75 w-28 hover:bg-sky-50" onClick={goToForm}></Button>
        </nav>
    );
}

export default Navbar;