import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      {/* HERO SECTION */}
      <section className="hero-section bg-blue-600 text-white p-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Fast & Reliable Transport</h1>
        <p className="text-lg mb-6">
          Book your ride instantly — anytime, anywhere.
        </p>
        <button
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow"
          onClick={() => navigate("/user/location")}
        >
          Book Now
        </button>
      </section>

      {/* SERVICE CATEGORIES */}
      <section className="services-section p-6">
        <h2 className="text-2xl font-semibold mb-4">Our Services</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="service-card p-4 shadow rounded-lg text-center cursor-pointer bg-white">
            <img src="/assets/icons/car.svg" alt="Ride" className="w-16 mx-auto mb-3" />
            <h3 className="font-semibold">Ride</h3>
          </div>

          <div className="service-card p-4 shadow rounded-lg text-center cursor-pointer bg-white">
            <img src="/assets/icons/van.svg" alt="Delivery" className="w-16 mx-auto mb-3" />
            <h3 className="font-semibold">Delivery</h3>
          </div>

          <div className="service-card p-4 shadow rounded-lg text-center cursor-pointer bg-white">
            <img src="/assets/icons/truck.svg" alt="Cargo" className="w-16 mx-auto mb-3" />
            <h3 className="font-semibold">Cargo</h3>
          </div>

          <div className="service-card p-4 shadow rounded-lg text-center cursor-pointer bg-white">
            <img src="/assets/icons/bike.svg" alt="Bike Ride" className="w-16 mx-auto mb-3" />
            <h3 className="font-semibold">Bike Ride</h3>
          </div>
        </div>
      </section>

      {/* QUICK FEATURES SECTION */}
      <section className="features-section p-6 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>

        <ul className="space-y-3">
          <li>✔ Fast booking process</li>
          <li>✔ Real-time driver tracking</li>
          <li>✔ Multiple vehicle options</li>
          <li>✔ Safe & verified drivers</li>
        </ul>
      </section>

      {/* CTA FOOTER */}
      <section className="cta-footer p-6 text-center">
        <button
          onClick={() => navigate("/user/my-orders")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
        >
          View My Orders
        </button>
      </section>
    </div>
  );
};

export default Home;
