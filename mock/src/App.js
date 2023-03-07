import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Header from './components/Header';
import { useState } from 'react';

import {ApolloClient , ApolloProvider, InMemoryCache} from '@apollo/client';


function App() {
 
  let geners = ["","Pop","Opera","Oratorio","Orchestral","Organum","Renaissance","Romantice","Romanticl","Sonata","Symphonic","Symphony","Twelve-tone","Wedding Music","Close Harmony","Contemporary Bluegrass","Contemporary Country","Country Gospel","Country Pop","Country Rap","Country Rock","Country Soul","Western","Cowpunk","Dansband","Honky Tonk"];

  const client = new ApolloClient({
    uri : "http://localhost:5000/graphql",
    cache : new InMemoryCache()
  });


  const [sortType,setSortType] = useState("all");
  const [genreType, setGenreType] = useState("NA");
  const [searchkey, setSearchkey] = useState("");


  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Header geners = {geners} 
        sortType = {sortType} 
        setSortType = {setSortType}
        genreType = {genreType}
        setGenreType = {setGenreType}
        searchkey ={searchkey}
        setSearchkey = {setSearchkey}
        />
      <Home geners = {geners} 
        sortType = {sortType} 
        setSortType = {setSortType}
        genreType = {genreType}
        setGenreType = {setGenreType}
        searchkey ={searchkey}
        setSearchkey = {setSearchkey}/>
    </div>
    </ApolloProvider>
  );
}

export default App;
