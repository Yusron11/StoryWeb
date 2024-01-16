import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const StoryList = () => {
    const [stories, setStory] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterOptions, setFilterOptions] = useState({
        category: 'All',
        status: 'All',
     });
     const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

    useEffect(() => {
        getStory();
    }, [searchTerm, filterOptions]);

    const getStory = async () => {
        try {
            const response = await axios.get("http://localhost:5000/stories", {
                params: { searchTerm, ...filterOptions }
            });
            setStory(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        getStory();
    };

    const deleteStory = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/stories/${id}`)
            getStory();
        } catch (error) {
            console.log(error);
        }
    };

    const handleFilter = () => {
        setIsFilterModalOpen(false);
     };

    const handleReset = () => {
        setFilterOptions({ category: 'All', status: 'All' });
  
        getStory();
  
        setIsFilterModalOpen(false);
     };

    return (
        <div>
            <div>
                <nav className="navbar bg-body-tertiary">
                    <div className="container-fluid">
                        <a href="/" className="navbar-brand">Story App</a>
                        
                        <form className="d-flex ms-auto me-3 col-md-3" onSubmit={handleSearch}>
                            <div className="input-group">
                                <input
                                    className="form-control me-2"
                                    type="search"
                                    placeholder="Search by Title or Author"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button className="btn btn-outline-success" type="submit">
                                    <FontAwesomeIcon icon="search" />
                                </button>
                            </div>
                        </form>

                        <button className="btn btn-outline-secondary me-2" type="button" onClick={() => setIsFilterModalOpen(true)}>
                            <FontAwesomeIcon icon="filter" /> Filter
                        </button>

                        <div className="modal" tabIndex="-1" role="dialog" style={{ display: isFilterModalOpen ? 'block' : 'none' }}>
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Filter Options</h5>
                                        <button type="button" className="close" data-dismiss="modal" onClick={() => setIsFilterModalOpen(false)}>
                                        <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        {/* Filter options go here */}
                                        <div className="mb-3">
                                        <label htmlFor="category">Category:</label>
                                        <select
                                            id="category"
                                            className="form-control"
                                            value={filterOptions.category}
                                            onChange={(e) => setFilterOptions({ ...filterOptions, category: e.target.value })}
                                        >
                                        
                                            <option value="All">All</option>
                                            <option value="Financial">Financial</option>
                                            <option value="Technology">Technology</option>
                                            <option value="Health">Health</option>
                                        </select>
                                        </div>
                                        <div className="mb-3">
                                        <label htmlFor="status">Status:</label>
                                        <select
                                            id="status"
                                            className="form-control"
                                            value={filterOptions.status}
                                            onChange={(e) => setFilterOptions({ ...filterOptions, status: e.target.value })}
                                        >
                                        
                                            <option value="All">All</option>
                                            <option value="Draft">Draft</option>
                                            <option value="Publish">Publish</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setIsFilterModalOpen(false)}>
                                        Cancel
                                        </button>
                                        <button type="button" className="btn btn-primary" onClick={() => handleFilter()}>
                                        Filter
                                        </button>
                                        <button type="button" className="btn btn-danger" onClick={() => handleReset()}>
                                        Reset
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="m-4">
                <Link to = {`add`} className='btn btn-primary'>Add Story</Link>
                <table className="table">
                    <thead>
                        <tr className="text-center">
                            <th scope="col">No</th>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                            <th scope="col">Category</th>
                            <th scope="col">Tags</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {stories.map((story, index) =>(
                            <tr key = {story.id}>
                                <td>{index +1}</td>
                                <td>
                                    <Link to={`detail/${story.id}`} className="text-dark">{story.title}</Link>
                                </td>
                                <td>{story.author}</td>
                                <td>{story.category}</td>
                                <td>{story.tags}</td>
                                <td>{story.status}</td>
                                <td>
                                    <Link to={`edit/${story.id}`} className='btn btn-warning me-1'>Edit</Link>
                                    <button onClick={() => deleteStory(story.id)} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StoryList