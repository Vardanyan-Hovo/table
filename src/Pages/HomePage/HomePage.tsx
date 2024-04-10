import React from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import Header from '../../Components/Header/Header';
import { Panel } from 'primereact/panel';
import stylesModule from"./paneldemo.module.css";

const HomePage: React.FC = () => {
    // const [value, setValue] = useState('');
    return (
        <div className='bg-indigo-300'>
            <Header/>
            <main className="text-right">

                <Panel header="CSS Module" className={stylesModule.mypanel}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Panel>
            </main>
        </div>
    );
}

export default HomePage;

