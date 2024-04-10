import React ,{ useState, useEffect }from 'react';
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';

//"https://github.com/typicode/json-server";
const API = "http://localhost:3000/"

interface Props{}

interface justifyOpt {
    icon:string,
    value:string
}

const justifyOptions = [
    {icon: 'pi  ', value: 'posts'},
    {icon: 'pi ', value: 'comments'},
    {icon: 'pi ', value: 'profile'},
];

const justifyTemplate = (option : justifyOpt) => {
    return <i className={option.icon}>{option.value}</i>;
}

const TablePage: React.FC = (props : Props) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<Error | null>(null);
    const [url, setUrl] = useState<string>("posts")

    async function syncron (url:string){
        try {
            const response = await fetch(API + url); // Replace with your API uRL
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            setData(data);
        } 
        catch (error:Error | any) {
            setError(error);
        }
    }
      
    useEffect(() => {
        syncron(url);
    }, [url]);


    return (
        <div className=' text-center'>
                <header className=' w-12 bg-black font-serif  h-20'>
                <h3 className='text-white font-serif'>Table</h3>
                    <SelectButton 
                        value={url} 
                        options={justifyOptions}
                        onChange={(e) => setUrl(e.value)} 
                        itemTemplate={justifyTemplate} 
                        optionLabel="value"
                        className='mb-2'
                        />
                </header>
            <div className='rounded-sm bg-slate-600  w-11/12 m-auto overflow-scroll   max-h-[700px]'>
                <div>
                    {error ? (
                        <p>Error fetching data: {error.message}</p>
                        ) : data ? (
                            <pre>{JSON.stringify(data, null, 2)}</pre> // Example display of fetched data
                            ) : (
                                <p>Loading data...</p>
                                )}
                </div>
            </div>
        </div>
    );
}

export default TablePage;