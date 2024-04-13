import React from 'react';
import Header from '../../Components/Header/Header';
import { Panel } from 'primereact/panel';
import stylesModule from"./paneldemo.module.css";

const HomePage: React.FC = () => {
    return (
        <div className='bg-indigo-300'>
            <Header/>
            <main className="text-right">

                <Panel header="CSS Module" className={stylesModule.mypanel}>
                    <p>
                        LStart a New React Project
                        If you want to build a new app or a new website fully with React, we 
                        recommend picking one of the React-powered frameworks popular in the community.
                        You can use React without a framework, however we’ve found that most apps and 
                        sites eventually build solutions to common problems such as code-splitting, routing, 
                        data fetching, and generating HTML. These problems are common to all UI libraries,
                        not just React. By starting with a framework, you can get started with React quickly, 
                        and avoid essentially building your own framework later..
                    </p>
                </Panel>
            </main>
        </div>
    );
}

export default HomePage;

