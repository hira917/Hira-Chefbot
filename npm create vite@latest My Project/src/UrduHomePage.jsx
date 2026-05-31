import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UrduHomePage.css';

const UrduHomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [email, setEmail] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Recipe Types Data with Images - مکمل اردو ناموں کے ساتھ
  const recipeTypes = [
    {
      id: 1,
      title: 'سوپ',
      description: 'موسم کے مطابق گرم اور آرام دہ سوپ',
      path: '/UrduSoup',
      image: 'https://substackcdn.com/image/fetch/$s_!Xw3X!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdfa9ec03-d4e8-4946-9649-cf7fe4f34059_1442x1103.heic'
    },
    {
      id: 2,
      title: 'میٹھے پکوان',
      description: 'میٹھی ڈشز اور لذیذ ٹریٹس',
      path: '/desserts',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'مرکزی ڈش',
      description: 'ہر موقع کے لیے بھرپور ڈشیں',
      path: '/MainCourse',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAAkO6PiyzExlXgDE-kZFg0VQlAt1sOqclhA&s'
    },
    {
      id: 4,
      title: 'مشروبات',
      description: 'ہر موڈ کے لیے تازگی بخش مشروبات',
      path: '/Beverage',
      image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      title: 'بیکنگ',
      description: 'تازہ بیک کی ہوئی چیزیں اور پیسٹریز',
      path: '/Baking',
      image: 'https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 6,
      title: 'علاقائی پکوان',
      description: 'روایتی اور جدید میٹھی ڈشیں',
      path: '/Regional',
      image: 'https://c.ndtvimg.com/2024-07/ejbft7io_head_625x300_03_July_24.jpg?im=FeatureCrop,algorithm=dnn,width=384,height=384'
    },
    {
      id: 7,
      title: 'سلاد',
      description: 'تازہ اور صحت بخش سلاد',
      path: '/Salads',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 8,
      title: 'نمکین اشیاء',  // SNACKS - آپ کی فرمائش کے مطابق
      description: 'چائے پاتی، پکوڑے، سموسے اور ہلکی پھلکی چیزیں',
      path: '/Snack',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Budget Friendly Categories Data with Images - اردو میں
  const budgetCategories = [
    {
      id: 1,
      title: 'بجٹ فرینڈلی',
      path: '/BudgetFriendly',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: [
        'سستے اور کفایتی کھانے',
        'پیسے بچانے والی ترکیبیں',
        'آسان اجزاء جو گھر میں مل جائیں',
        'مہینے بھر کا کھانے کا منصوبہ'
      ]
    },
    {
      id: 2,
      title: 'طالب علموں کے لیے',
      path: '/StudentRecipe',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: [
        'آسان طالب علمی والے کھانے',
        'ہوسٹل اور کمرے میں پکنے والی ڈشیں',
        'جلدی تیار ہونے والی ترکیبیں',
        'چند برتنوں میں بننے والا کھانا'
      ]
    },
    {
      id: 3,
      title: 'جلد باز والی ترکیبیں',
      path: '/QuickRecipe',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: [
        'پندرہ منٹ میں تیار کھانا',
        'آسان اور سادہ ترکیبیں',
        'کم سے کم برتن استعمال کریں',
        'مصروف دنوں کے لیے بہترین'
      ]
    },
    {
      id: 4,
      title: 'سبزی خور ڈشیں',
      path: '/Vege',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      features: [
        'بغیر گوشت کے پکوان',
        'پودوں سے حاصل کردہ پروٹین',
        'صحت بخش اور ہلکا کھانا',
        'سبزیوں کے مشہور پکوان'
      ]
    }
  ];

  // Hero Images - شاندار تصاویر
  const heroImages = [
    'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80',
    'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=2400&q=80'
  ];

  // Auto slide hero images - تصویریں خودبخود بدلیں
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Navigation Handlers - صفحہ تبدیل کرنے کے لیے
  const handleRecipeTypeClick = (path) => {
    navigate(path);
  };

  const handleBudgetCategoryClick = (path) => {
    navigate(path);
  };

  return (
    <div className="urdu-homepage">
      {/* ========== ہیرو بینر - اوپر والی بڑی تصویر ========== */}
      <section className="hero-banner">
        <div className="hero-slider">
          {heroImages.map((image, index) => (
            <div 
              key={index}
              className={`hero-slide ${index === currentImageIndex ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ))}
          <div className="slider-dots">
            {heroImages.map((_, index) => (
              <button
                key={index}
                className={`slider-dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== مرکزی حصہ ========== */}
      <main className="main-content">
        
        {/* پکوانوں کی اقسام - Recipe Types Section */}
        <section className="recipe-types-section">
          <div className="recipe-types-container">
            <div className="section-header">
              <h2>پکوانوں کی دنیا</h2>
              <p>ماہر باورچیوں کی بنائی ہوئی ترکیبیں، آپ کے گھر کے کچن کے لیے</p>
            </div>
            
            <div className="recipe-types-grid">
              {recipeTypes.map((type) => (
                <div 
                  key={type.id}
                  className="circle-card-wrapper"
                  onClick={() => handleRecipeTypeClick(type.path)}
                >
                  <div className="circle-card">
                    <div className="circle-image-container">
                      <img src={type.image} alt={type.title} className="circle-image" />
                    </div>
                  </div>
                  <h3 className="circle-card-title">{type.title}</h3>
                  <p className="circle-card-description">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* سستے اور آسان پکوان - Budget Friendly Section */}
        <section className="budget-friendly-section">
          <div className="section-header">
            <h2>آسان اور کفایتی پکوان</h2>
            <p>ریسٹورنٹ جیسے مزے دار کھانے، روزمرہ پکانے کے لیے آسان</p>
          </div>

          <div className="budget-grid-new">
            {budgetCategories.map((category) => (
              <div 
                key={category.id}
                className="budget-card-new"
                onClick={() => handleBudgetCategoryClick(category.path)}
              >
                {/* اوپر والا خانہ - عنوان */}
                <div className="budget-card-header">
                  <h3 className="budget-card-title">{category.title}</h3>
                </div>
                
                {/* درمیان میں تصویر */}
                <div className="budget-card-image-container">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="budget-card-image"
                  />
                </div>
                
                {/* نیچے والا حصہ - خصوصیات */}
                <div className="budget-card-content">
                  <ul className="budget-card-features">
                    {category.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* خاص خوبیاں - Features Section */}
        <section className="features-section">
          <div className="section-header">
            <h2>آپ کے پکانے کا سفر مزید آسان</h2>
            <p>جدید خصوصیات جو گھر کے باورچیوں کے لیے بنائی گئی ہیں</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>اے آئی پکوان</h3>
              <p>آپ کی پسند کے مطابق ترکیبیں تجویز کریں</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-step-forward"></i>
              </div>
              <h3>مرحلہ وار ہدایات</h3>
              <p>مکمل پکانے کے طریقے، ٹائمر اور مشوروں کے ساتھ</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-utensils"></i>
              </div>
              <h3>کھانے کا منصوبہ</h3>
              <p>ہفتہ وار کھانے کا شیڈول اور خودکار خریداری کی فہرست</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-clock"></i>
              </div>
              <h3>جلد باز والے پکوان</h3>
              <p>مصروف دنوں کے لیے تیز اور آسان ترکیبیں</p>
            </div>
          </div>
        </section>
        
      </main>
    </div>
  );
};

export default UrduHomePage;