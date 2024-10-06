import React, { useEffect } from 'react';
import './AboutUs.css'; // Import CSS file for styling

const AboutUs = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.about-us-section');
    sections.forEach(section => {
      if (isElementInViewport(section)) {
        section.classList.add('animate');
      }
    });

    function isElementInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    window.addEventListener('scroll', () => {
      sections.forEach(section => {
        if (isElementInViewport(section)) {
          section.classList.add('animate');
        }
      });
    });

    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>About Us</h1>
        <p className="subheader">Learn more about Elite Bags</p>
      </div>

      <section className="about-us-section">
        <h2 className="section-title">Our Company</h2>
        <p>
          Welcome to Elite Bags, where we specialize in providing high-quality, stylish, and durable bags for every occasion. Our mission is to combine fashion with function, offering products that meet the needs of our diverse customer base.
        </p>
        <p>
          Founded in 20XX, Elite Bags has grown from a small boutique to a global brand known for innovation and craftsmanship. We pride ourselves on using sustainable materials and ethical production practices.
        </p>
      </section>

      <section className="about-us-section">
        <h2 className="section-title">Our Mission</h2>
        <p>
          At Elite Bags, our mission is to provide our customers with the best possible products and service. We believe in the power of well-designed products to make life easier and more enjoyable. Our goal is to create bags that are not only stylish but also practical and long-lasting.
        </p>
        <p>
          We are committed to sustainability and environmental responsibility. Our initiatives include reducing our carbon footprint, using eco-friendly materials, and supporting fair labor practices.
        </p>
      </section>

      <section className="about-us-section">
        <h2 className="section-title">Company Values</h2>
        <ul className="company-values">
          <li><span>Quality:</span> We prioritize quality in every aspect of our products.</li>
          <li><span>Innovation:</span> Constantly striving for innovation in design and functionality.</li>
          <li><span>Customer Focus:</span> Putting our customers' needs first in everything we do.</li>
          <li><span>Sustainability:</span> Commitment to sustainable practices and materials.</li>
        </ul>
      </section>

      <section className="about-us-section testimonials-section">
        <h2 className="section-title">Customer Testimonials</h2>
        <div className="testimonials">
          <div className="testimonial">
            <p>
              "Elite Bags provides exceptional quality and fantastic customer service. I love my new backpack!"
            </p>
            <h4>- Emily R.</h4>
          </div>
          <div className="testimonial">
            <p>
              "I've been using Elite Bags for years. Their products are durable and stylish. Highly recommend!"
            </p>
            <h4>- David S.</h4>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
