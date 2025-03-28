import React from 'react';
import { Link } from 'react-router-dom';
import NewsletterSubscribe from '../components/NewsletterSubscribe';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8" 
      style={{
        backgroundImage: 'url("/images/home-bg.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-800 mb-4">Swasthyashe</h1>
        <p className="text-xl text-gray-600">
          Empowering Women's Health Through Traditional Wisdom and Modern Science
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md"
         style={{
          backgroundImage: 'url("/images/ancientwisdom-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(255, 255, 255, 0.9)' // This creates a white overlay
        }}
        >
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Ancient Wisdom</h2>
          <p className="text-gray-600">
          <p className="text-gray-600">  
  <span className="text-xl font-bold text-black-700">🌿 Ancient Wisdom: Nurturing Women's Well-being</span>  
  <br /><br />  
  For generations, Indian traditions have embraced the power of nature and holistic living to support women's health and well-being. Rooted in the ancient sciences of <strong>Ayurveda, yoga, and natural remedies</strong>, these time-tested practices offer gentle, effective ways to navigate every stage of womanhood—from menstruation to motherhood and beyond.  
  <br /><br />  
  From soothing <strong>herbal remedies</strong> for period pain to mindful rituals that promote balance and inner strength, Indian traditions remind us that true wellness comes from honoring the <strong>body, mind, and soul</strong>. These practices not only nurture physical health but also foster <strong>resilience, confidence, and a deep connection to self</strong>.  
  <br /><br />  
  <em>Step into the world of ancient Indian wisdom and discover natural ways to embrace and celebrate your well-being.</em>  
</p>

          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md"
        style={{
          backgroundImage: 'url("/images/modernscience.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(255, 255, 255, 0.9)' // This creates a white overlay
        }}
        >
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Modern Science</h2>
          <p className="text-gray-600 font-sans">  
  <span className="text-xl font-bold text-black-700">🔬 Modern Science: Bridging Tradition and Innovation</span>  
  <br /><br />  
  While ancient Indian practices have nurtured women's health for generations, <strong>modern science</strong> is now validating and enhancing these time-tested traditions. Contemporary research reveals how <strong>natural remedies, mindful rituals, and holistic lifestyles</strong> contribute to optimal health outcomes—from hormonal balance to mental well-being.  
  <br /><br />  
  Scientific studies have confirmed the benefits of practices like <strong>yoga for stress relief</strong>, <strong>Ayurvedic herbs for hormonal health</strong>, and <strong>traditional diets for better digestion and immunity</strong>. By blending ancient wisdom with modern insights, women can embrace a <strong>holistic approach to well-being</strong> that's both rooted in tradition and backed by science.  
  <br /><br />  
  <em>Discover how modern science empowers and enriches traditional practices, helping women lead healthier, stronger, and more balanced lives.</em>  
</p>

        </div>
        <div className="bg-white p-6 rounded-lg shadow-md"
        style={{
          backgroundImage: 'url("/images/holistic.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay',
          backgroundColor: 'rgba(255, 255, 255, 0.9)' // This creates a white overlay
        }}
        >
          <h2 className="text-2xl font-semibold text-purple-700 mb-4">Holistic Approach</h2>
          <p className="text-gray-600 font-sans">  
  <span className="text-xl font-bold text-black-700">🌸 Holistic Approach: Balance for Body, Mind & Spirit</span>  
  <br /><br />  
  True well-being goes beyond just physical health—it’s about creating harmony between the <strong>body, mind, and spirit</strong>. A holistic approach to women’s health embraces this connection, combining <strong>nutrition, movement, mindfulness, and self-care</strong> to promote overall wellness.  
  <br /><br />  
  By integrating <strong>ancient traditions, modern science, and mindful living</strong>, women can cultivate a lifestyle that supports <strong>physical strength, emotional balance, and inner peace</strong>. Whether through <strong>nutritious foods, yoga, meditation, or self-care rituals</strong>, a holistic approach ensures that every aspect of health is nurtured.  
  <br /><br />  
  <em>Step into a world where wellness is not just about treatment but about <strong>preventive care, self-love, and long-term vitality</strong>.</em>  
</p>

        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {[
          {
            title: 'Period Health',
            description: 'Natural remedies and holistic approaches to menstrual wellness.',
            path: '/period-health',
          },
          {
            title: 'Mental Wellness',
            description: 'Traditional practices for emotional balance and mental harmony.',
            path: '/mental-wellness',
          },
          {
            title: 'Sexual & Reproductive Health',
            description: 'Essential information for reproductive well-being.',
            path: '/sexual-health',
          },
          {
            title: 'Skin & Hair Care',
            description: 'Natural beauty secrets from Ayurvedic traditions.',
            path: '/skin-hair-care',
          },
          {
            title: 'Pregnancy Care',
            description: 'Holistic support throughout your pregnancy journey.',
            path: '/pregnancy-care',
          },
        ].map((topic) => (
          <Link
            key={topic.path}
            to={topic.path}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">{topic.title}</h2>
            <p className="text-gray-600">{topic.description}</p>
          </Link>
        ))}
      </div>

      <div className="max-w-xl mx-auto">
        <NewsletterSubscribe />
      </div>
    </div>
  );
};

export default Home;