import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const EditStory = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [category, setCategory] = useState("Financial");
    const [status, setStatus] = useState("Draft");
    const [tags, setTags] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        getStoryByID();
    }, []);

    const updateStory = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/stories/${id}`, {
                title,
                author,
                synopsis,
                category,
                status,
                tags
            });
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    const getStoryByID = async () => {
        const response = await axios.get(`http://localhost:5000/stories/${id}`);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setSynopsis(response.data.synopsis);
        setCategory(response.data.category);
        setStatus(response.data.status);
        setTags(response.data.tags);

    };
    
    return (
        <div className='columns m-5 is-centered'>
            <form className="row g-3" onSubmit={updateStory}>
                <div className="col-md-6">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" value={title} 
                    onChange={(e) => setTitle(e.target.value)} placeholder='title of story'/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Author</label>
                    <input type="text" className="form-control" value={author} 
                    onChange={(e) => setAuthor(e.target.value)} placeholder='writer name'/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Synopsis</label>
                    <textarea className="form-control" rows="3" value={synopsis} 
                    onChange={(e) => setSynopsis(e.target.value)} placeholder='synopsis'></textarea>
                </div>
                <div className="form-group col-md-6">
                    <label >Category</label>
                    <select className="form-control" value={category} 
                    onChange={(e) => setCategory(e.target.value)}>
                        <option value="Financial">Financial</option>
                        <option value="Technology">Technology</option>
                        <option value="Health">Health</option>
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label >Status</label>
                    <select className="form-control" value={status} 
                    onChange={(e) => setStatus(e.target.value)}>
                        <option value="Draft">Draft</option>
                        <option value="Publish">Publish</option>
                    </select>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Tags</label>
                    <input type="text" className="form-control" value={tags} 
                    onChange={(e) => setTags(e.target.value)} />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Update</button>
                </div>
            </form>
        </div>
    );
};

export default EditStory;