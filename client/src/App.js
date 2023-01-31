import {useEffect, useState} from 'react';
import Select from 'react-select';
import { MdDelete } from 'react-icons/md';
import {FaEdit} from 'react-icons/fa';
import {GiCancel} from 'react-icons/gi';
import axios from 'axios'git push -
function App() {
    const [data, setData] = useState([]);
    const options = [
        { value: 'urgent', label: 'Urgent', color: "#EF2000"},
        { value: 'regular', label: 'Regular', color: "#CBB536"},
        { value: 'trivial', label: 'Trivial', color: "#0496FF"},
    ];
    const [job, setJob] = useState("");
    const [priority, setPriority] = useState(null);
    const [editPriority, setEditPriority] = useState(null);
    const [edit, setEdit] = useState(false);
    const [jobId, setJobId] = useState("");
    const [jobName, setJobName] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try{
                const data = await axios.get("http://localhost:1907/api/jobs");
                setData(data.data);
            }catch (err){
                console.log(err);
            }
        }
        fetchData();
    }, [data])

    const handleSubmit =async (e) => {
        e.preventDefault();
        const newJob = {
            job,
            priority: priority.value,
            color: priority.color
        }
        try{
            const res = await axios.post("http://localhost:1907/api/jobs", newJob);
            console.log(res.data)
            setJob("");
        }catch (err){
            console.log(err);
        }
    }
    const deleteClick = async (id) => {
        try{
            await axios.delete(`http://localhost:1907/api/jobs/${id}`, id);
            console.log("Deleted");
        }catch (err){
            console.log(err);
        }
    };
    const editClick = async () => {
        const editJob = {
            priority: editPriority.value,
            color: editPriority.color
        }
        try{
            await axios.put(`http://localhost:1907/api/jobs/${jobId}`, editJob)
            setEdit(false);
            console.log(editJob)
        }catch (err){
            console.log(err);
        }
    }
    const editt = (id, jobName) => {
        setEdit(true);
        console.log(id)
        setJobId(id);
        setJobName(jobName);
    }


  return (
    <div className="min-h-screen bg-tema2 flex justify-center relative">
        {edit && <div
            className="flex bg-tema3/[.6] flex-col items-center justify-center w-screen h-screen absolute top-0 left-0 z-10">
            <div
                className="w-2/5 relative border h-3/5 bg-tema3 rounded-xl flex items-center flex-col justify-center gap-10">
                <button className="absolute top-3 right-3" onClick={() => setEdit(false)}><GiCancel
                    className="text-2xl text-white"/></button>
                <span className="text-white text-xl font-bold capitalize">{jobName}</span>
                <Select
                    className="w-4/5 focus:outline-none border rounded "
                    onChange={setEditPriority}
                    options={options}
                    placeholder={'Select Priority'}
                />
                <button onClick={() => editClick(job._id)} className="bg-black border text-white rounded py-1 px-6 text-xl hover:opacity-90">Update</button>
            </div>
        </div>}
        <div className="bg-tema2 w-2/3 flex flex-col items-center">
            <form onSubmit={handleSubmit} className="flex p-2 gap-3 flex-col items-center justify-center my-4 w-2/4">
                <label className="font-bold text-xl">Job</label>
                <input className="w-4/5 focus:outline-none border rounded p-2" value={job} onChange={(e) => setJob(e.target.value)} type="text" placeholder="Input your job..."/>
                <label className="font-bold text-xl">Priority</label>
                <Select
                    className="w-4/5 focus:outline-none border rounded "
                    onChange={setPriority}
                    options={options}
                    placeholder={"Select Priority"}
                />
                <button className="bg-black border text-white rounded py-2 px-6 text-xl hover:opacity-90">Create</button>
            </form>
            <div className="w-full">
                <div className="flex items-center justify-between px-4 py-3 border-b border-black">
                    <h2 className="font-bold text-xl">Job List</h2>
                    <input onChange={e => setSearch(e.target.value)} className="w-1/3 rounded focus:outline-none p-1 border" placeholder="Search Job" type="text"/>
                    <span className="bg-black border text-white rounded py-1 px-6 text-xl hover:opacity-90">Search Job</span>
                </div>

                {data && data.filter((item) => {
                    return search.toLowerCase() === "" ? item
                        : item.job.toLowerCase().includes(search)
                }).map((job, i) => (
                    <div key={i} style={{backgroundColor: `${job.color}`}} className="p-4 rounded flex items-center border m-4 text-tema3">
                       <div className="flex flex-1  items-center">
                           <span className="text-xl font-bold capitalize">{job.job}</span>
                       </div>
                        <div className="flex flex-1 items-center justify-between">
                            <span className="text-xl font-bold capitalize">{job.priority}</span>
                            <div className="flex justify-end items-center gap-20">
                                <button onClick={() => editt(job._id, job.job)}><FaEdit className="text-xl"/></button>
                                <button onClick={() => deleteClick(job._id)}><MdDelete className="text-xl"/></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
}

export default App;
