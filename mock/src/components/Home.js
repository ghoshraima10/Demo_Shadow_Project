import React, { useState } from 'react';
import '../css/Home.css';
import Album from './Album'
import {gql,useLazyQuery,useQuery} from '@apollo/client';

function Home({geners , sortType, setSortType, genreType, setGenreType,searchkey,setSearchkey}) { 


      const getSongs = gql`
          query getSongs {
            songs {
              id
              albumId
              thumbnailUrl
              title
              url
            }
          }
      `;

      const getAZSongs = gql`
      query getSongs {
        sortedSongsAZ {
          id
          albumId
          thumbnailUrl
          title
          url
        }
      }
  `;

  const getZASongs = gql`
      query getSongs {
        sortedSongsZA {
          id
          albumId
          thumbnailUrl
          title
          url
        }
      }
  `;
  const getVowelSongs = gql`
  query getVowel {
    sortedByVowels {
      id
      albumId
      thumbnailUrl
      title
      url
    }
  }
`;
const getTitleLength = gql`
query getlength {
  sortedByTitleLength  {
    id
    albumId
    thumbnailUrl
    title
    url
  }
}
`;


  const getSortedByGenre = gql`
  query getGenre($albumId : Int!){
    sortByGenere(albumId:$albumId) {
      id
      albumId
      thumbnailUrl
      title
      url
   }
 }
  `;

  const getSongsBySearch =  gql`
  query getGenre($Srchkey : String!){
    sortBySearch(key:$Srchkey) {
      id
      albumId
      thumbnailUrl
      title
      url
   }
 }
  `;


  var qry='';
  var key = "songs";
  var indx = 0;
  


if(searchkey==""){

    if(sortType === "all") {
      qry = getSongs;
      key = "songs";
        if (genreType !== "NA") {
          indx = (geners.indexOf(genreType))*4;
          qry = getSortedByGenre;
          key = "sortByGenere";
        }
      }
      else if (sortType === "a-z") {
      qry = getAZSongs;
      key = "sortedSongsAZ"
      }
      else if (sortType === "z-a") {
      qry = getZASongs;
      key = "sortedSongsZA";
      }
      else if (sortType === "vowels") {
        qry = getVowelSongs;
        key = "sortedByVowels";
        }
        else if (sortType === "length") {
          qry = getTitleLength;
          key = "sortedByTitleLength";
         
        }
      }

      else{
        qry=getSongsBySearch;
        key='sortBySearch';
      }

      console.log(indx);

      // switch(key) {
      //   case "sortByGenere" : {
          var {loading, error, data} = useQuery(qry,{
            variables: {albumId:indx,Srchkey:searchkey} ,
          });
          // break;
      //   }
      //   default : {
      //     var {loading, error, data} = useQuery(qry);
      //   }
      // }
        
      


      if(loading) return (<div> Wait. . .</div>);

      else if(error) return (<h1>Errorrr : {error.message}</h1>);

      else 
      return(
        <div >
            <div id='grid' className='container'> 

            {
            data[key].map(val => {
            return (
                <Album data={val} genre = {geners} />
            )
            })
            }                      
            
            </div>
        </div>
     );
}

export default Home;