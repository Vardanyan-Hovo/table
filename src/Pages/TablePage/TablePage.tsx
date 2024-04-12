import React ,{ useState }from 'react';
import TableALl from "../../Components/Table/Table";
import { SelectButton } from 'primereact/selectbutton';

interface Props{}

interface justifyOpt {
    icon:string,
    value:string
}


//for option request
const justifyOptions = [
    {icon: 'pi  ', value: 'posts'},
    {icon: 'pi ', value: 'comments'},
    {icon: 'pi ', value: 'profile'},
];

//for SelectButton button 
//posts  comments  profile
const justifyTemplate = (option : justifyOpt) => {
    return <i className={option.icon}>{option.value}</i>;
}

const TablePage: React.FC = (props : Props) => {

    const [url, setUrl] = useState<string>("posts")
    

    return (
        <div className='text-center'>
            <header className=' w-12 bg-black font-serif  h-20'>
                <h3 className='text-white font-serif'>Table</h3>
                <SelectButton
                    value={url}
                    options={justifyOptions}
                    onChange={(e) => {
                        if (e.value !== url && e.value){
                            // console.log("value ===========" +e.value  )
                                setUrl(e.value)
                            }
                        }}
                    itemTemplate={justifyTemplate}
                    optionLabel="value"
                    className='mb-2'
                />
            </header>
            <div className='rounded-sm bg-slate-600 w-11/12 m-auto overflow-scroll max-h-[700px]'>
                <div>
                    <TableALl  question={url}/>
                </div>
            </div>
        </div>
    );
}

export default TablePage;