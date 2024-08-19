import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import Search from './components/Search';
import ReviewList from './components/ReviewList';
import reviewsData from './cochrane_reviews.json'; // Import the JSON data

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [displayedReviews, setDisplayedReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const REVIEWS_PER_LOAD = 10;

  const flattenedReviews = reviewsData.flat();

  // Filtered reviews based on the selected topic
  const filteredReviews = selectedTopic
    ? flattenedReviews.filter(review => review.topic === selectedTopic)
    : flattenedReviews;

  const topics = Array.from(new Set(flattenedReviews.map(review => review.topic)));

  useEffect(() => {
    // Reset reviews if the topic changes
    setDisplayedReviews([]);
    setCurrentIndex(0);
    loadMoreReviews();
  }, [selectedTopic]);

  // Function to load more reviews
  const loadMoreReviews = () => {
    let filteredReviews;

    if (selectedTopic) {
      filteredReviews = flattenedReviews.filter(review => review.topic === selectedTopic);
    } else {
      filteredReviews = flattenedReviews.filter(review =>
        review.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (currentIndex >= filteredReviews.length) return;

    const nextIndex = currentIndex + REVIEWS_PER_LOAD;
    const newReviews = filteredReviews.slice(currentIndex, nextIndex);
    setDisplayedReviews(prevReviews => [...prevReviews, ...newReviews]);
    setCurrentIndex(nextIndex);
    console.log(currentIndex);
    console.log(nextIndex);
  };

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;

      loadMoreReviews();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentIndex, filteredReviews]);

  const matchingReviewsCount = selectedTopic
  ? flattenedReviews.filter(review => review.topic === selectedTopic).length
  : 0;

  return (
    <div className="App">
      <Search
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        topics={topics}
        onSelectTopic={(topic) => {
          setSelectedTopic(topic);
          setSearchTerm(topic);
          setCurrentIndex(0); // Optional: Set the search term to the selected topic
        }}
        matchingReviewsCount={matchingReviewsCount} // Pass the count to the Search component
        selectedTopic={selectedTopic}
      />
      <ReviewList reviews={displayedReviews} />
    </div>
  );
}

export default App;
