import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
// Note: Ensure App.css contains the CSS provided below the component
import "../../App.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  // Parallax effect for blobs
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleNav = (path) => {
    if (!user && path.includes("booking")) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      {/* Background Mesh Gradient */}
      <div style={styles.backgroundMesh}>
        <div style={{...styles.blob, top: "-10%", left: "-10%", background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px)`}}></div>
        <div style={{...styles.blob, bottom: "20%", right: "-10%", background: "radial-gradient(circle, #ec4899 0%, transparent 70%)", transform: `translate(${mousePos.x}px, ${mousePos.y}px)`}}></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section style={styles.heroSection}>
        <div className="page-container" style={styles.heroContainer}>
          
          {/* Left Content */}
          <div style={styles.heroContent}>
            <div className="fade-in-up" style={{animationDelay: '0.1s'}}>
              <span style={styles.pillBadge}>✨ #1 Logistics App in India</span>
            </div>
            
            {/* FIXED: Merged duplicate style props */}
            <h1 className="fade-in-up" style={{...styles.heroTitle, animationDelay: '0.2s'}}>
              Move Anything, <br />
              <span style={styles.gradientText}>Anywhere, Instantly.</span>
            </h1>
            
            {/* FIXED: Merged duplicate style props */}
            <p className="fade-in-up" style={{...styles.heroSubtitle, animationDelay: '0.3s'}}>
              Experience the future of logistics with ShipEase. Connect with verified drivers, 
              track goods in real-time, and save up to 30% on every shipment.
            </p>

            {/* FIXED: Merged duplicate style props */}
            <div className="fade-in-up" style={{...styles.buttonGroup, animationDelay: '0.4s'}}>
              <button className="primary-btn" onClick={() => handleNav("/booking/create")}>
                Book Now &rarr;
              </button>
              <button className="secondary-btn" onClick={() => navigate("/about")}>
                View Demo
              </button>
            </div>

            {/* FIXED: Merged duplicate style props */}
            <div className="fade-in-up" style={{...styles.statsRow, animationDelay: '0.5s'}}>
              <div style={styles.statItem}>
                <h4 style={styles.statNum}>50k+</h4>
                <span style={styles.statLabel}>Deliveries</span>
              </div>
              <div style={styles.statDivider}></div>
              <div style={styles.statItem}>
                <h4 style={styles.statNum}>4.8/5</h4>
                <span style={styles.statLabel}>User Rating</span>
              </div>
              <div style={styles.statDivider}></div>
              <div style={styles.statItem}>
                <h4 style={styles.statNum}>100%</h4>
                <span style={styles.statLabel}>Safe</span>
              </div>
            </div>
          </div>

          {/* Right Visual (CSS Phone Mockup) */}
          <div style={styles.heroVisual} className="float-animation">
            <div style={styles.phoneMockup}>
              <div style={styles.phoneNotch}></div>
              <div style={styles.phoneScreen}>
                {/* Mockup Header */}
                <div style={{padding: '15px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0'}}>
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div style={{width:'20px', height:'20px', borderRadius:'50%', background:'#cbd5e1'}}></div>
                    <div style={{fontSize:'0.8rem', fontWeight:'bold', color:'#334155'}}>ShipEase</div>
                    <div style={{fontSize:'1rem'}}>☰</div>
                  </div>
                </div>
                {/* Mockup Map Area */}
                <div style={{height: '120px', background: '#e0f2fe', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <div style={{fontSize: '2rem'}}>🗺️</div>
                  <div style={{position: 'absolute', bottom: '10px', right: '10px', background: 'white', padding: '5px 10px', borderRadius: '10px', fontSize: '0.7rem', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}}>
                    Driver is 5 min away
                  </div>
                </div>
                {/* Mockup List */}
                <div style={{padding: '15px'}}>
                   <div style={styles.mockupItem}>
                      <div style={styles.mockupIcon}>📦</div>
                      <div>
                        <div style={{fontWeight: '600', fontSize: '0.8rem'}}>Order #2931</div>
                        <div style={{fontSize: '0.65rem', color: '#64748b'}}>In Transit • Arriving 2:00 PM</div>
                      </div>
                   </div>
                   <div style={styles.mockupItem}>
                      <div style={styles.mockupIcon}>🚚</div>
                      <div>
                        <div style={{fontWeight: '600', fontSize: '0.8rem'}}>Vehicle Matched</div>
                        <div style={{fontSize: '0.65rem', color: '#64748b'}}>Tata Ace • MH 12 AB 1234</div>
                      </div>
                   </div>
                   <button style={{width: '100%', padding: '10px', marginTop: '10px', background: '#3b82f6', border: 'none', borderRadius: '8px', color: 'white', fontSize: '0.8rem'}}>Track Live</button>
                </div>
              </div>
            </div>
            
            {/* Floating Elements around phone */}
            <div className="glass-card bounce-card" style={styles.floatCard1}>
              <span>⚡ Fast</span>
            </div>
            <div className="glass-card bounce-card" style={{...styles.floatCard2, animationDelay: '1s'}}>
              <span>🛡️ Insured</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="page-container" style={styles.featuresSection}>
        <div style={{textAlign: "center", marginBottom: "60px"}}>
          <h2 style={styles.sectionTitle}>Everything you need to <span style={{color: '#3b82f6'}}>grow</span></h2>
          <p style={styles.sectionSubtitle}>
            Powerful features designed to streamline your logistics operations from start to finish.
          </p>
        </div>

        <div style={styles.gridContainer}>
          {/* Card 1 */}
          <div style={styles.featureCard} onClick={() => handleNav("/booking/create")}>
            <div style={{...styles.iconBox, background: '#eff6ff', color: '#3b82f6'}}>📍</div>
            <h3 style={styles.cardTitle}>Instant Booking</h3>
            <p style={styles.cardText}>
              Get a verified truck at your doorstep in minutes using our AI-powered matching system.
            </p>
          </div>

          {/* Card 2 */}
          <div style={styles.featureCard} onClick={() => handleNav("/dashboard/orders")}>
            <div style={{...styles.iconBox, background: '#f0fdf4', color: '#22c55e'}}>📡</div>
            <h3 style={styles.cardTitle}>Live Tracking</h3>
            <p style={styles.cardText}>
              Monitor your goods with GPS precision. Share tracking links with your customers instantly.
            </p>
          </div>

          {/* Card 3 */}
          <div style={styles.featureCard} onClick={() => handleNav("/booking/vehicle")}>
            <div style={{...styles.iconBox, background: '#fff7ed', color: '#f97316'}}>🚛</div>
            <h3 style={styles.cardTitle}>Diverse Fleet</h3>
            <p style={styles.cardText}>
              From 2-wheelers for documents to 10-ton trucks for industrial loads, we have it all.
            </p>
          </div>
        </div>
      </section>
      
      {/* --- CALL TO ACTION --- */}
      <section style={styles.ctaSection}>
        <div className="page-container" style={styles.ctaContainer}>
            <h2 style={{color: 'white', fontSize: '2.5rem', marginBottom: '20px'}}>Ready to move?</h2>
            <p style={{color: '#e0e7ff', marginBottom: '30px', maxWidth: '600px'}}>Join thousands of businesses who trust ShipEase for their daily logistics.</p>
            <button style={styles.ctaButton} onClick={() => handleNav("/booking/create")}>Get Started for Free</button>
        </div>
      </section>

    </div>
  );
};

// --- STYLES OBJECT ---
const styles = {
  pageWrapper: {
    fontFamily: "'Inter', sans-serif",
    overflowX: "hidden",
    position: "relative",
    background: "#ffffff",
  },
  backgroundMesh: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: 0,
    overflow: "hidden",
    pointerEvents: "none",
  },
  blob: {
    position: "absolute",
    width: "800px",
    height: "800px",
    borderRadius: "50%",
    filter: "blur(80px)",
    opacity: 0.4,
    transition: "transform 0.2s ease-out",
  },
  heroSection: {
    position: "relative",
    zIndex: 1,
    padding: "120px 0 80px 0",
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
  },
  heroContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "50px",
  },
  heroContent: {
    flex: 1,
    minWidth: "350px",
  },
  pillBadge: {
    display: "inline-block",
    padding: "8px 16px",
    borderRadius: "30px",
    background: "rgba(59, 130, 246, 0.1)",
    color: "#2563eb",
    fontWeight: "600",
    fontSize: "0.9rem",
    marginBottom: "24px",
    border: "1px solid rgba(59, 130, 246, 0.2)",
  },
  heroTitle: {
    fontSize: "clamp(3rem, 6vw, 4.5rem)",
    fontWeight: "900",
    lineHeight: "1.1",
    color: "#0f172a",
    marginBottom: "24px",
    letterSpacing: "-1px",
  },
  gradientText: {
    background: "linear-gradient(135deg, #2563eb 0%, #9333ea 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSubtitle: {
    fontSize: "1.25rem",
    color: "#64748b",
    lineHeight: "1.6",
    marginBottom: "40px",
    maxWidth: "540px",
  },
  buttonGroup: {
    display: "flex",
    gap: "16px",
    marginBottom: "48px",
  },
  statsRow: {
    display: "flex",
    alignItems: "center",
    gap: "30px",
    paddingTop: "30px",
    borderTop: "1px solid #f1f5f9",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
  },
  statNum: {
    fontSize: "1.8rem",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
  },
  statLabel: {
    fontSize: "0.9rem",
    color: "#64748b",
    marginTop: "4px",
  },
  statDivider: {
    width: "1px",
    height: "40px",
    background: "#cbd5e1",
  },
  
  // Visual / Phone Mockup
  heroVisual: {
    flex: 1,
    minWidth: "350px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    perspective: "1000px",
  },
  phoneMockup: {
    width: "300px",
    height: "600px",
    background: "#0f172a",
    borderRadius: "40px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 0 0 8px #334155",
    padding: "12px",
    position: "relative",
    transform: "rotateY(-15deg) rotateX(10deg)",
    transition: "transform 0.5s ease",
  },
  phoneScreen: {
    width: "100%",
    height: "100%",
    background: "#ffffff",
    borderRadius: "28px",
    overflow: "hidden",
    position: "relative",
  },
  phoneNotch: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "120px",
    height: "25px",
    background: "#0f172a",
    borderBottomLeftRadius: "16px",
    borderBottomRightRadius: "16px",
    zIndex: 10,
  },
  mockupItem: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    padding: "12px",
    background: "white",
    borderRadius: "12px",
    marginBottom: "10px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
  },
  mockupIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
  },
  floatCard1: {
    position: "absolute",
    top: "20%",
    left: "-20px",
    padding: "12px 24px",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    fontWeight: "bold",
    color: "#0f172a",
    border: "1px solid rgba(255,255,255,0.5)",
  },
  floatCard2: {
    position: "absolute",
    bottom: "20%",
    right: "-30px",
    padding: "12px 24px",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    fontWeight: "bold",
    color: "#0f172a",
    border: "1px solid rgba(255,255,255,0.5)",
  },

  // Features Section
  featuresSection: {
    padding: "100px 0",
    position: "relative",
    zIndex: 2,
    background: "#ffffff",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "16px",
  },
  sectionSubtitle: {
    fontSize: "1.1rem",
    color: "#64748b",
    maxWidth: "600px",
    margin: "0 auto",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "40px",
    padding: "20px",
  },
  featureCard: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "40px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden",
  },
  iconBox: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.8rem",
    marginBottom: "24px",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "12px",
    color: "#0f172a",
  },
  cardText: {
    fontSize: "1rem",
    color: "#64748b",
    lineHeight: "1.6",
  },

  // CTA Section
  ctaSection: {
    padding: "100px 0",
    background: "linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)",
    textAlign: "center",
  },
  ctaContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  ctaButton: {
    padding: "16px 48px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#1e40af",
    background: "#ffffff",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
    transition: "transform 0.2s ease",
  }
};

export default LandingPage;