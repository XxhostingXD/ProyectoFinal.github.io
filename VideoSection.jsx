import React from 'react';

function VideoSection() {
  return (
    <div>
      <h2>Videos</h2>
      <p>Aquí puedes ver videos relacionados con nuestros servicios.</p>
      <video width="600" controls>
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>
    </div>
  );
}

export default VideoSection;
