import React from 'react';
import './App.css';

import Row from './components/Row';
import requests from './request';
import Banner from './components/Banner';
import Nav from './components/Nav';

function App() {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row title={'Netflix Originals'} fetchUrl={requests.fetchNetflixOriginals} isLarge={true} />
      <Row title={'Trending Now'} fetchUrl={requests.fetchTrending} />
      <Row title={'Top Rated'} fetchUrl={requests.fetchTopRated} />
      <Row title={'Action Movies'} fetchUrl={requests.fetchActionMovies} />
      <Row title={'Romantic Movies'} fetchUrl={requests.fetchRomanceMovies} />
      <Row title={'Horror Movies'} fetchUrl={requests.fetchHorrorMovies} />
      <div
        style={{
          height: "20px"
        }} />
    </div>
  );
}

export default App;
