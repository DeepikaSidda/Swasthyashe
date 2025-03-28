import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navItems = [
    { path: '/period-health', label: 'Period Health' },
    { path: '/mental-wellness', label: 'Mental Wellness' },
    { path: '/sexual-health', label: 'Sexual & Reproductive Health' },
    { path: '/skin-hair-care', label: 'Skin & Hair Care' },
    { path: '/pregnancy-care', label: 'Pregnancy Care' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      >
        <span className="sr-only">Open menu</span>
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      <div className={`bg-white w-64 flex flex-col h-full fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 transition duration-200 ease-in-out shadow-lg z-30`}>
        {/* Logo Section */}
        <div className="p-3 sm:p-4 border-b border-gray-200">
  <Link to="/" className="flex items-center justify-center">
    <img 
      src="/images/logo-bg.jpg" 
      alt="Swasthyashe Logo" 
      className="h-20 sm:h-24 md:h-32 w-auto object-contain transition-all duration-200" 
    />
  </Link>
</div>


        {/* Navigation Section */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2.5 mb-1 rounded-md transition duration-200 text-sm sm:text-base ${
                location.pathname === item.path 
                  ? 'bg-purple-100 text-purple-700 font-medium' 
                  : 'text-gray-700 hover:bg-purple-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* About App Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-purple-50 p-4 rounded-lg shadow-sm border border-purple-100">
            
            <h3 className="text-lg font-semibold text-purple-700 mb-2">
            Grandma's Healing Touch
            </h3>
            <p className="text-sm text-gray-600 mb-3">
  Swasthyashe is born from the belief that women's health is a journey nurtured by both ancient traditions and modern science. At the heart of this app lies the timeless wisdom of Indian <strong>Bhammas</strong> (grandmothers), who have been the original healers in every household, offering remedies rooted in nature and tradition. Their knowledge—of herbs that soothe, foods that heal, and rituals that strengthen—has been passed down through generations, forming the foundation of holistic well-being.
</p>

<p className="text-sm text-gray-600 mb-3">
  Enriched by contemporary research, Swasthyashe blends this ancestral knowledge with modern scientific insights, ensuring that every recommendation is both time-tested and evidence-based. The app guides women through every stage of life, from managing menstrual health and pregnancy care to supporting mental wellness and skin care.
</p>

<p className="text-sm text-gray-600 mb-3">
  It’s not just about treatment but about embracing a lifestyle that honors the body, mind, and spirit. Swasthyashe empowers women with natural remedies, mindful practices, and scientific tips, fostering resilience, confidence, and long-term vitality. It celebrates the strength of women and the enduring wisdom of <strong>Bhammas</strong>, creating a space where tradition meets innovation for holistic well-being.
</p>

            <h3 className="text-lg font-semibold text-purple-700 mb-2">Vedic Wisdom for Health</h3>
            <p className="text-sm text-gray-600 mb-3">
              🌿 <strong>Ayurveda (Science of Life)</strong>: Originating from the Atharva Veda, Ayurveda focuses on balancing the three doshas—Vata, Pitta, and Kapha—using natural healing, diet, and herbal remedies.
            </p>
            <p className="text-sm text-gray-600 mb-3">
              🧘‍♀️ <strong>Yoga (Union of Body and Mind)</strong>: Rooted in the Rig Veda, yoga promotes physical and mental well-being through asanas, pranayama, and meditation.
            </p>
            <p className="text-sm text-gray-600 mb-3">
              🔥 <strong>Yajurveda (Rituals and Discipline)</strong>: Emphasizes disciplined living and rituals that cultivate mindfulness and balance.
            </p>
            <p className="text-sm text-gray-600 mb-3">
              ✨ <strong>Atharva Veda (Healing and Medicine)</strong>: Offers insights into herbal medicine, spiritual healing, and ancient chants for holistic wellness.
            </p>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Version 1.0.0</span>
              <span>© 2025 Swasthyashe</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
};

export default Sidebar;
