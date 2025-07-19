import React, { useState, useEffect } from 'react';
import './App.css';

const GroceryHub = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });
  const [userLocation, setUserLocation] = useState({ city: 'Your Location', pincode: '' });
  const [locationLoading, setLocationLoading] = useState(true);

  // Slideshow data
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=600&fit=crop",
      title: "Fresh Groceries Delivered",
      subtitle: "Get the best quality products at your doorstep",
      buttonText: "Shop Now"
    },
    {
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&h=600&fit=crop",
      title: "100% Organic Vegetables",
      subtitle: "Farm fresh vegetables delivered daily",
      buttonText: "Explore"
    },
    {
      image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1600&h=600&fit=crop",
      title: "Premium Fresh Fruits",
      subtitle: "Handpicked seasonal fruits",
      buttonText: "Order Now"
    }
  ];

  // Flash sale products
  const flashSaleProducts = [
    {
      id: 1,
      name: "Organic Tomatoes",
      image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgetyourleanon.com%2Fwp-content%2Fuploads%2F2014%2F09%2FFotolia_60393337_Subscription_Monthly_M.jpg&f=1&nofb=1&ipt=2800ffe0588ea10026da35dd7959a6c7793bc122ec89e470d3225d61d3412e29w=400",
      discount: "44% OFF",
      salePrice: 45,
      originalPrice: 80,
      rating: 4.5,
      sold: 234
    },
    {
      id: 2,
      name: "Fresh Spinach",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400",
      discount: "42% OFF",
      salePrice: 35,
      originalPrice: 60,
      rating: 4.3,
      sold: 156
    },
    {
      id: 3,
      name: "Premium Apples",
      image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400",
      discount: "29% OFF",
      salePrice: 85,
      originalPrice: 120,
      rating: 4.7,
      sold: 89
    },
    {
      id: 4,
      name: "Organic Milk",
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
      discount: "26% OFF",
      salePrice: 48,
      originalPrice: 65,
      rating: 4.6,
      sold: 312
    }
  ];

  // Categories data
  const categories = [
    { icon: "🥬", name: "Fresh Vegetables", image: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=400" },
    { icon: "🍎", name: "Fruits", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400" },
    { icon: "🥛", name: "Dairy & Milk", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400" },
    { icon: "🍿", name: "Snacks", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400" },
    { icon: "🥤", name: "Beverages", image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400" },
    { icon: "🌾", name: "Grains & Pulses", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400" },
    { icon: "🍞", name: "Bakery", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400" },
    { icon: "🐟", name: "Meat & Fish", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400" }
  ];

  // Trending products
  const trendingProducts = [
    { id: 5, name: "Basmati Rice 5kg", image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400", price: 599, rating: 4.4, reviews: 1250 },
    { id: 6, name: "Premium Honey", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400", price: 299, rating: 4.8, reviews: 890 },
    { id: 7, name: "Organic Tea", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400", price: 149, rating: 4.2, reviews: 567 },
    { id: 8, name: "Mixed Dry Fruits", image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdryfruitsmandy.com%2Fwp-content%2Fuploads%2F2021%2F02%2FMIX-DRIED-FRUITS.jpg&f=1&nofb=1&ipt=d0e5ccf6ee419cae8b11789ef33dcc2754615ed39a69f450f8837501237e7903w=400", price: 699, rating: 4.6, reviews: 423 },
    { id: 9, name: "Fresh Bread", image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400", price: 45, rating: 4.1, reviews: 234 }
  ];

    // Get user's location on component mount
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              
              // Using BigDataCloud's free reverse geocoding API (no API key required)
              const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              
              if (response.ok) {
                const data = await response.json();
                const city = data.city || 
                           data.locality || 
                           data.principalSubdivision || 
                           'Your City';
                
                const pincode = data.postcode || '';
                
                setUserLocation({ city, pincode });
              }
            } catch (error) {
              console.log('Error getting location details:', error);
              setUserLocation({ city: 'Your Location', pincode: '' });
            } finally {
              setLocationLoading(false);
            }
          },
          (error) => {
            console.log('Geolocation error:', error);
            // Handle different error cases
            if (error.code === error.PERMISSION_DENIED) {
              setUserLocation({ city: 'Location Denied', pincode: '' });
            } else if (error.code === error.POSITION_UNAVAILABLE) {
              setUserLocation({ city: 'Location Unavailable', pincode: '' });
            } else {
              setUserLocation({ city: 'Your Location', pincode: '' });
            }
            setLocationLoading(false);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // Cache for 5 minutes
          }
        );
      } else {
        setUserLocation({ city: 'Location Not Supported', pincode: '' });
        setLocationLoading(false);
      }
    };

    getUserLocation();
  }, []);

  // Auto-advance slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex(prev => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        
        if (totalSeconds <= 0) {
          return { hours: 23, minutes: 59, seconds: 59 };
        } else {
          return {
            hours: Math.floor(totalSeconds / 3600),
            minutes: Math.floor((totalSeconds % 3600) / 60),
            seconds: totalSeconds % 60
          };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const showSlide = (index) => {
    setCurrentSlideIndex(index);
  };

  const nextSlide = () => {
    setCurrentSlideIndex(prev => (prev + 1) % slides.length);
  };

  const previousSlide = () => {
    setCurrentSlideIndex(prev => (prev - 1 + slides.length) % slides.length);
  };

  const addToCart = () => {
    setCartItemCount(prev => prev + 1);
  };

  const toggleCart = () => {
    alert(`Cart has ${cartItemCount} items`);
  };

  const toggleMobileMenu = () => {
    console.log('Mobile menu toggled');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-800 via-purple-800 to-pink-700 text-white text-sm py-2 px-6 flex justify-between items-center flex-wrap">
        <div className="flex items-center gap-4">
          <span>
            📍 Deliver to {locationLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              `${userLocation.city}${userLocation.pincode ? ` ${userLocation.pincode}` : ''}`
            )}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="animate-pulse">🎊 Festive Sale Live!</span>
          <span>Free Delivery on Orders ₹299+</span>
          <span>🔔</span>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span 
                style={{ display: 'block', width: '24px', height: '24px', fontSize: '24px', cursor: 'pointer' }}
                onClick={toggleMobileMenu}
              >
                ☰
              </span>
              <h1 className="logo">GroceryHub</h1>
            </div>
            
            <div className="search-container">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search for groceries, brands, and more..."
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="header-actions">
              <a href="#" className="header-btn">
                <span>👤</span>
                <span style={{ display: 'Account' }}>Account</span>
              </a>
              <a href="#" className="header-btn">
                <span>❤️</span>
                <span style={{ display: 'Wishlist' }}>Wishlist</span>
              </a>
              <button className="cart-btn" onClick={toggleCart}>
                <span>🛒</span>
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="cart-count">{cartItemCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-items">
            <a href="#" className="nav-item">All Categories</a>
            <a href="#" className="nav-item">Vegetables</a>
            <a href="#" className="nav-item">Fruits</a>
            <a href="#" className="nav-item">Dairy</a>
            <a href="#" className="nav-item">Snacks</a>
            <a href="#" className="nav-item">Beverages</a>
            <a href="#" className="nav-item">Offers</a>
            <a href="#" className="nav-item">New Arrivals</a>
          </div>
        </div>
      </nav>

      {/* Hero Slideshow */}
      <section className="hero-section">
        <div className="container">
          <div className="slideshow-container">
            <div 
              className="slideshow"
              style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="slide">
                  <img src={slide.image} alt={slide.title} />
                  <div className="slide-overlay"></div>
                  <div className="slide-content">
                    <h2 className="slide-title">{slide.title}</h2>
                    <p className="slide-subtitle">{slide.subtitle}</p>
                    <button className="slide-btn">{slide.buttonText}</button>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="nav-btn prev" onClick={previousSlide}>‹</button>
            <button className="nav-btn next" onClick={nextSlide}>›</button>
            
            <div className="indicators">
              {slides.map((_, index) => (
                <button 
                  key={index}
                  className={`indicator ${index === currentSlideIndex ? 'active' : ''}`}
                  onClick={() => showSlide(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale Timer */}
      <section className="flash-sale">
        <div className="container">
          <div className="flash-sale-container">
            <div className="flash-sale-content">
              <div className="flash-sale-info">
                <div className="flash-icon">⚡</div>
                <div>
                  <h2 className="flash-title">⚡ Flash Sale</h2>
                  <p className="flash-subtitle">Limited time offers - Grab them now!</p>
                </div>
              </div>
              <div className="timer">
                <span>🕐</span>
                <div className="timer-display">
                  <div className="timer-box">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <span>:</span>
                  <div className="timer-box">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <span>:</span>
                  <div className="timer-box">{String(timeLeft.seconds).padStart(2, '0')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flash Sale Items */}
      <section className="products-section">
        <div className="container">
          <div className="products-grid">
            {flashSaleProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="discount-badge">{product.discount}</div>
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-rating">
                    <div className="rating-stars">
                      <span style={{ color: '#fbbf24' }}>★</span>
                      <span className="rating-text">{product.rating}</span>
                    </div>
                    <span className="rating-text">({product.sold} sold)</span>
                  </div>
                  <div className="product-prices">
                    <span className="sale-price">₹{product.salePrice}</span>
                    <span className="original-price">₹{product.originalPrice}</span>
                  </div>
                  <button className="add-to-cart" onClick={addToCart}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-icon">{category.icon}</div>
                <img src={category.image} alt={category.name} className="category-image" />
                <p className="category-name">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Deals */}
      <section className="trending-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title" style={{ marginBottom: 0 }}>Trending Deals</h2>
            <a href="#" className="view-all-btn">
              <span>View All</span>
              <span>›</span>
            </a>
          </div>
          <div className="trending-grid">
            {trendingProducts.map((product) => (
              <div key={product.id} className="trending-card">
                <div className="trending-image-container">
                  <img src={product.image} alt={product.name} className="trending-image" />
                  <button className="wishlist-btn">❤️</button>
                </div>
                <div className="trending-info">
                  <h3 className="trending-name">{product.name}</h3>
                  <div className="product-rating">
                    <div className="rating-stars">
                      <span style={{ color: '#fbbf24' }}>★</span>
                      <span className="rating-text">{product.rating}</span>
                    </div>
                    <span className="rating-text">({product.reviews})</span>
                  </div>
                  <div className="trending-footer">
                    <span className="trending-price">₹{product.price}</span>
                    <button className="add-btn" onClick={addToCart}>Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      <button className="floating-cart" onClick={toggleCart}>
        <span>🛒</span>
        <span>Cart</span>
        {cartItemCount > 0 && (
          <span className="cart-count">{cartItemCount}</span>
        )}
      </button>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3 className="footer-brand">GroceryHub</h3>
              <p className="footer-description">Fresh groceries delivered to your doorstep with love and care.</p>
            </div>
            <div>
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Categories</h4>
              <ul className="footer-links">
                <li><a href="#">Vegetables</a></li>
                <li><a href="#">Fruits</a></li>
                <li><a href="#">Dairy</a></li>
                <li><a href="#">Snacks</a></li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Customer Service</h4>
              <ul className="footer-links">
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Track Order</a></li>
                <li><a href="#">Returns</a></li>
                <li><a href="#">Shipping Info</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 GroceryHub. All rights reserved. Made with ❤️ for fresh food lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GroceryHub;
