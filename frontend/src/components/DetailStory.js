import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const DetailStory = () => {
    const [chapters, setChapter] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [synopsis, setSynopsis] = useState("");
    const [category, setCategory] = useState("Financial");
    const [status, setStatus] = useState("Draft");
    const [tags, setTags] = useState("");
    const {id} = useParams();

    useEffect(() => {
        getStoryByID();
    }, []);

    useEffect(() => {
        getChapter();
    }, []);

    const getChapter = async () => {
        const response = await axios.get(`http://localhost:5000/chapters`);
        const formattedChapters = response.data.map(chapter => {
            return {
                ...chapter,
                updatedAt: format(new Date(chapter.updatedAt), 'dd MMMM yyyy'),
            };
        });
        setChapter(formattedChapters);
    }

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
            <form className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" value={title} 
                    onChange={(e) => setTitle(e.target.value)} placeholder='title of story' disabled/>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Author</label>
                    <input type="text" className="form-control" value={author} 
                    onChange={(e) => setAuthor(e.target.value)} placeholder='writer name' disabled/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Synopsis</label>
                    <textarea className="form-control" rows="3" value={synopsis} 
                    onChange={(e) => setSynopsis(e.target.value)} placeholder='synopsis' disabled></textarea>
                </div>
                <div className="form-group col-md-6">
                    <label >Category</label>
                    <select className="form-control" value={category} 
                    onChange={(e) => setCategory(e.target.value)} disabled>
                        <option value="Financial">Financial</option>
                        <option value="Technology">Technology</option>
                        <option value="Health">Health</option>
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label >Status</label>
                    <select className="form-control" value={status} 
                    onChange={(e) => setStatus(e.target.value)} disabled>
                        <option value="Draft">Draft</option>
                        <option value="Publish">Publish</option>
                    </select>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Tags</label>
                    <input type="text" className="form-control" value={tags} 
                    onChange={(e) => setTags(e.target.value)} disabled/>
                </div>
                <Link to = {`add/chapter`} className='btn btn-primary'>Add Chapter</Link>
            </form>

            <div className="m-4">
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">No</th>
                            <th scope="col">Title</th>
                            <th scope="col">Last Updated</th>
                            <th scope="col">Story ID</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {chapters.map((chapter, index) =>(
                            <tr key = {chapter.id}>
                                <td>{index +1}</td>
                                <td>{chapter.title}</td>
                                <td>{chapter.updatedAt}</td>
                                <td>{chapter.story_id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DetailStory;