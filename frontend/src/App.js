import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import StoryList from './components/StoryList';
import AddStory from './components/AddStory';
import EditStory from './components/EditStory';
import DetailStory from './components/DetailStory';
import AddChapter from './components/AddChapter';

library.add(faSearch, faFilter);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoryList />} />
        <Route path="add" element={<AddStory />} />
        <Route path="detail/:id/add/chapter" element={<AddChapter />} />
        <Route path="edit/:id" element={<EditStory />} />
        <Route path="detail/:id" element={<DetailStory />} />
      </Routes>
    </Router>
  );
}

export default App;
