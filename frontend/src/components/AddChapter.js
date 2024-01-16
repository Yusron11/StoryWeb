import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const AddChapter = () => {
    const [title, setTitle] = useState("");
    const [chapter_story, setChapter] = useState("");
    const [story_id, setID] = useState("");
    const navigate = useNavigate();

    const saveStory = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/chapters', {
                title,
                chapter_story,
                story_id

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
                <div className="mb-3">
                    <label className="form-label">Story</label>
                    <textarea className="form-control" rows="3" value={chapter_story} 
                    onChange={(e) => setChapter(e.target.value)} placeholder='story'></textarea>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Story_ID</label>
                    <input type="number" className="form-control" value={story_id} 
                    onChange={(e) => setID(e.target.value)} placeholder='title of story'/>
                </div>
                
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    );
};

export default AddChapter