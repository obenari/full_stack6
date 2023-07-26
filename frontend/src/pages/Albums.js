import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Albums.css";

function Albums({ user }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`) //https://jsonplaceholder.typicode.com/users/1/albums
      .then((response) => response.json())
      .then((data) => {
        //data = data.filter((a) => a.userId === user.id);
        setAlbums(data);
        localStorage.setItem("albums", JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error fetching albums:", error);
      });
  }, [user]);

  return (
    <div>
      <div className="albums-container">
        {albums.map((album) => (
          <Link
            key={album.id}
            to={`/users/${user?.name}/albums/${album.id}`}
            className="album-link"
          >
            <div className="album">
              <h4 className="album-id">{`Album Id: ${album.id}`}</h4>
              <h3 className="album-title">{album.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Albums;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import "../css/Albums.css";

// function Albums({user}) {
//   const [albums, setAlbums] = useState([]);

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/albums')
//       .then(response => response.json())
//       .then(data => {
//         data = data.filter(a => a.userId === user.id)
//         setAlbums(data);
//         localStorage.setItem("albums", JSON.stringify(data))
//       })
//       .catch(error => {
//         console.error('Error fetching albums:', error);
//       });
//   }, [user]);

//   return (
//     <div>
//     <h2>Albums</h2>
//     <div className="albums-container">
//       {albums.map(album => (
//         <Link to={`/albums/${album.id}`} >
//         <div key={album.id} className="album">
//           <h3 className="album-title">{album.title}</h3>
//           <Link to={`/albums/${album.id}`} className="album-link">View Photos</Link>
//         </div>
//         </Link>
//       ))}
//     </div>
//   </div>
//   );
// }

// export default Albums;
