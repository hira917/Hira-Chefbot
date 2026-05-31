import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './Regional.css';

const Regional = () => {
  const scrollContainerRef = useRef(null);

  const categories = [
    {
      id: 1,
      name: "Pakistani Cuisine",
      tagline: "Desi flavors, rich & aromatic",
      image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=500",
      route: "/PakistaniCuisine"
    },
    {
      id: 2,
      name: "Continental Cuisine",
      tagline: "European classic dishes",
      image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500",
      route: "/ContinentalCuisine"
    },
    {
      id: 3,
      name: "Chinese Cuisine",
      tagline: "Wok-tossed, savory & spicy",
      image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=500",
      route: "/ChineseCuisine"
    },
    {
      id: 4,
      name: "Italian Cuisine",
      tagline: "Pasta, pizza & Mediterranean",
      image: "https://images.unsplash.com/photo-1579684947550-22e945225d9a?w=500",
      route: "/ItalianCuisine"
    },
    {
      id: 5,
      name: "Mexican",
      tagline: "Bold, spicy & vibrant",
      image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500",
      route: "/MexicanCuisine"
    }
  ];

  return (
    <div className="regional-page">
      {/* Header */}
      <header className="regional-header">
        <div className="regional-header-content">
          <h1 className="regional-page-title">Regional Cuisines</h1>
          <p className="regional-page-description">
            Explore flavors from around the world
          </p>
        </div>
      </header>

      {/* Categories Container */}
      <main className="regional-main">
        <div className="regional-categories-wrapper">
          <div className="regional-categories-container" ref={scrollContainerRef}>
            <div className="regional-categories-row">
              {categories.map((category, index) => (
                <Link
                  key={category.id}
                  to={category.route}
                  className={`regional-category-card ${index % 2 === 0 ? 'card-up' : 'card-down'}`}
                >
                  {/* Image Container */}
                  <div className="regional-card-image-container">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="regional-card-image"
                      loading="lazy"
                    />
                    <div className="regional-image-overlay"></div>
                  </div>

                  {/* Content */}
                  <div className="regional-card-content">
                    <h3 className="regional-category-title">{category.name}</h3>
                    <p className="regional-category-description">{category.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="regional-bg-decoration"></div>
    </div>
  );
};

export default Regional;