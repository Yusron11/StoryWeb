import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AddStory = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [category, setCategory] = useState("Financial");
    const [status, setStatus] = useState("Draft");
    const [tags, setTags] = useState("");
    const navigate = useNavigate();

    const saveStory = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/stories', {
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
    }
    
    return (
        <div className='columns m-5 is-centered'>
            <form className="row g-3" onSubmit={saveStory}>
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
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    );
};

export default AddStory