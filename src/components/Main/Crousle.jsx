import React from 'react';
import '../Style/Mainstyle/carousel.css'


const Crousle = () => {
  return (
    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img 
            // src="https://i.pinimg.com/736x/ce/a9/ab/cea9ab625d1486fbfc534b6984b12fbd.jpg?w=1380" 
           src="https://nres.novelread.com/res/item/d3de15b67073bba210247b950f307a43.jpg@p=4&h=400"
           
            className="d-block w-100 carousel-img" 
            alt="Slide 1" 
          />
        </div>
        <div className="carousel-item">
          <img 
            // src="https://i.pinimg.com/736x/64/5c/31/645c31dee5b4ce4bd7b947bed679063b.jpg?w=1480" 
            src ="https://nres.novelread.com/res/item/9f3eecef89e266468e41d99857b8dc82.jpg@p=4&h=400"
            className="d-block w-100 carousel-img" 
            alt="Slide 2" 
          />
        </div>
        <div className="carousel-item">
          <img 
            // src="https://i.pinimg.com/736x/58/b1/f4/58b1f4eacf68dcfe948f6febe8536afd.jpg?w=1380" 
            src="https://nres.novelread.com/res/item/284563356ff026b86a8f81181a50ac9f.jpg@p=4&h=400"
            className="d-block w-100 carousel-img" 
            alt="Slide 3" 
          />
        </div>
      </div>
     
    </div>
  );
}

export default Crousle;
