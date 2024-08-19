import React, { useState, useEffect } from 'react';

function Search({ searchTerm, setSearchTerm, topics, onSelectTopic, matchingReviewsCount, selectedTopic }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filteredSuggestions = topics.filter(topic =>
        topic.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, topics]);

  const handleResetSearch = () => {
    setSearchTerm('');
    onSelectTopic(''); // Reset the selected topic
  };

  return (
    <div className="search-container">
      <div className="search-input-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <img src="/search.svg" className="search-icon" />
      
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => onSelectTopic(suggestion)}
              style={{ color: 'blue', cursor: 'pointer' }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      </div>
      {selectedTopic && (
        <div className="reviews-count">
          <div><strong>Topics: </strong><button className="clear-button" onClick={handleResetSearch}>{selectedTopic} <img className="xmark-icon" src="/xmark.svg"/></button></div>
          <br></br>
          <strong>{matchingReviewsCount}</strong> Cochrane Reviews matching <strong>{selectedTopic || searchTerm} in Cochrane Topic</strong>
        </div>
      )}
    </div>
  );
}

export default Search;