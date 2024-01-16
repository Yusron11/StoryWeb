import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import StoryList from './components/StoryList';
import AddStory from './components/AddStory';
import EditStory from './components/EditStory';

library.add(faSearch, faFilter);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoryList />} />
        <Route path="add" element={<AddStory />} />
        <Route path="edit/:id" element={<EditStory />} />
      </Routes>
    </Router>
  );
}

export default App;
