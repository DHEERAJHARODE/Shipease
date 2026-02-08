import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";
import VehicleList from "../../components/features/VehicleList";
import { VEHICLES } from "../../utils/constants";

const SelectVehicle = () => {
  const { vehicle, setVehicle } = useBookingContext();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleNext = () => {
    if (!vehicle) {
      setError("Please select a vehicle type to proceed.");
      return;
    }
    navigate("/booking/summary");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.mainContainer}>
        
        {/* --- PROGRESS HEADER --- */}
        <div style={styles.headerSection}>
          <div style={styles.progressBarContainer}>
            <div style={styles.progressBarFill}></div>
          </div>
          <div style={styles.stepIndicator}>
            <span style={styles.stepText}>Step 2 of 3</span>
            <h2 style={styles.pageTitle}>Choose your Vehicle</h2>
          </div>
        </div>

        <div style={styles.contentGrid}>
          {/* --- LEFT COLUMN: VEHICLE LIST --- */}
          <div style={styles.leftColumn}>
            <p style={styles.helperText}>
              Select a vehicle that fits your load size. Prices may vary based on demand.
            </p>
            
            {/* The Vehicle List Component */}
            <div style={styles.listWrapper}>
              <VehicleList
                vehicles={VEHICLES}
                selectedVehicle={vehicle} // Assuming your component accepts this for highlighting
                onSelect={(v) => {
                  setVehicle(v);
                  setError(null);
                }}
              />
            </div>

            {error && (
              <div style={styles.errorBox}>
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* --- RIGHT COLUMN: SUMMARY & HELP (Desktop Only mostly) --- */}
          <div style={styles.rightColumn}>
             <div style={styles.infoCard}>
                <h3 style={styles.infoTitle}>Why ShipEase?</h3>
                <ul style={styles.benefitList}>
                  <li style={styles.benefitItem}>✓ Real-time tracking</li>
                  <li style={styles.benefitItem}>✓ Verified drivers</li>
                  <li style={styles.benefitItem}>✓ Insurance included</li>
                </ul>
                <div style={styles.divider}></div>
                <p style={{fontSize: '0.9rem', color: '#64748b'}}>
                  Need help choosing? <br/>
                  <a href="#" style={{color: '#2563eb'}}>Call Support</a>
                </p>
             </div>
          </div>
        </div>

        {/* --- FOOTER ACTION BAR --- */}
        <div style={styles.footerBar}>
          <button style={styles.backBtn} onClick={handleBack}>
            &larr; Back
          </button>
          <div style={{flex: 1}}></div> {/* Spacer */}
          <button style={styles.nextBtn} onClick={handleNext}>
            Proceed to Summary &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  pageBackground: {
    minHeight: "100vh",
    background: "#f8fafc", // Light gray background
    padding: "40px 20px 100px 20px", // Bottom padding for footer
    fontFamily: "'Inter', sans-serif",
  },
  mainContainer: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  
  // Header & Progress
  headerSection: {
    marginBottom: "40px",
  },
  progressBarContainer: {
    width: "100%",
    height: "6px",
    background: "#e2e8f0",
    borderRadius: "3px",
    marginBottom: "20px",
    overflow: "hidden",
  },
  progressBarFill: {
    width: "66%", // Step 2 of 3 = 66%
    height: "100%",
    background: "linear-gradient(90deg, #2563eb, #60a5fa)",
    borderRadius: "3px",
    transition: "width 0.3s ease",
  },
  stepIndicator: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  stepText: {
    textTransform: "uppercase",
    fontSize: "0.75rem",
    letterSpacing: "1px",
    fontWeight: "600",
    color: "#64748b",
  },
  pageTitle: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "#0f172a",
    margin: 0,
  },

  // Grid Layout
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 300px", // Main content + Sidebar
    gap: "40px",
    alignItems: "start",
  },
  // Responsive fix handled via media queries ideally, but for inline:
  // Note: If you want mobile responsiveness without media queries in inline styles, 
  // you might need a simple window width hook or CSS file. 
  // For now, these styles prioritize desktop/tablet.
  
  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  rightColumn: {
    // Usually hidden on mobile in real CSS
    display: "block", 
  },

  helperText: {
    fontSize: "1rem",
    color: "#64748b",
    marginBottom: "10px",
  },
  listWrapper: {
    background: "white",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
    overflow: "hidden", // Keeps children inside rounded corners
    padding: "10px",
  },

  // Error Box
  errorBox: {
    padding: "16px",
    background: "#fef2f2",
    border: "1px solid #fee2e2",
    borderRadius: "12px",
    color: "#ef4444",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    animation: "shake 0.5s cubic-bezier(.36,.07,.19,.97) both",
  },

  // Info Card (Sidebar)
  infoCard: {
    background: "white",
    padding: "24px",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    position: "sticky",
    top: "20px",
  },
  infoTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    marginBottom: "16px",
    color: "#0f172a",
  },
  benefitList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 20px 0",
  },
  benefitItem: {
    fontSize: "0.9rem",
    color: "#475569",
    marginBottom: "10px",
    display: "flex",
    gap: "8px",
  },
  divider: {
    height: "1px",
    background: "#f1f5f9",
    margin: "20px 0",
  },

  // Footer Actions
  footerBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    background: "white",
    padding: "20px 40px",
    boxShadow: "0 -4px 20px rgba(0,0,0,0.05)",
    display: "flex",
    alignItems: "center",
    zIndex: 100,
    borderTop: "1px solid #e2e8f0",
  },
  nextBtn: {
    padding: "14px 32px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "50px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background 0.2s",
    boxShadow: "0 4px 10px rgba(37, 99, 235, 0.2)",
  },
  backBtn: {
    padding: "14px 24px",
    background: "transparent",
    color: "#64748b",
    border: "none",
    borderRadius: "50px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "color 0.2s",
  }
};

export default SelectVehicle;