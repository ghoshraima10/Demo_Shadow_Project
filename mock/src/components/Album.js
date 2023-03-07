import React from 'react';
import '../css/Album.css';


function Album({data,genre}) {

    var genreName = genre[Math.ceil(data.albumId/4)]; 

    return ( 
        <div className='card my-2' >
            <div className='Albumcontainer' onClick={() => {window.open(data.url)}}>
                <img src={data.thumbnailUrl} alt="hi" className='im'></img>
            </div>

            <div className='title mx-auto'>
            <p><b>Title : </b>{data.title}</p>
           
            <p><b>Genre : </b>{genreName}</p>
            <p><b>ID : </b>{data.id}</p>
            </div>

        </div>
     );
}

export default Album;