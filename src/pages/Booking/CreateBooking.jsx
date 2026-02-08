import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";
// Note: Assuming Input component accepts standard props. 
// If it needs specific styling, you might need to wrap it.
import Input from "../../components/common/Input"; 

const CreateBooking = () => {
  const { pickup, drop, setPickup, setDrop } = useBookingContext();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (!pickup || !drop) {
      setError("Please enter both pickup and drop locations.");
      return;
    }
    setError(null);
    navigate("/booking/vehicle");
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
            <span style={styles.stepText}>Step 1 of 3</span>
            <h2 style={styles.pageTitle}>Where are we moving?</h2>
          </div>
        </div>

        <div style={styles.contentGrid}>
          {/* --- LEFT COLUMN: INPUTS --- */}
          <div style={styles.leftColumn}>
            <div style={styles.card}>
              <div style={styles.inputGroup}>
                <div style={styles.iconLabel}>📍 Pickup Location</div>
                <Input
                  placeholder="e.g. 123, Main Street, Mumbai"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  style={styles.inputField} 
                />
              </div>

              <div style={styles.connectorLine}></div>

              <div style={styles.inputGroup}>
                <div style={styles.iconLabel}>🏁 Drop Location</div>
                <Input
                  placeholder="e.g. 456, Tech Park, Pune"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  style={styles.inputField}
                />
              </div>
            </div>

            {error && (
              <div style={styles.errorBox}>
                ⚠️ {error}
              </div>
            )}
          </div>

          {/* --- RIGHT COLUMN: VISUAL/MAP --- */}
          <div style={styles.rightColumn}>
             <div style={styles.mapPlaceholder}>
                <div style={{fontSize: '3rem', marginBottom: '10px'}}>🗺️</div>
                <p style={{color: '#64748b', textAlign: 'center'}}>
                  Enter locations to see<br/>estimated route & time.
                </p>
             </div>
             <div style={styles.infoCard}>
                <h3 style={styles.infoTitle}>Quick Tips</h3>
                <ul style={styles.benefitList}>
                  <li style={styles.benefitItem}>• Be specific with landmarks</li>
                  <li style={styles.benefitItem}>• Check for road restrictions</li>
                </ul>
             </div>
          </div>
        </div>

        {/* --- FOOTER ACTION BAR --- */}
        <div style={styles.footerBar}>
           {/* No Back button on first step typically, or navigate to home */}
          <button style={styles.backBtn} onClick={() => navigate("/")}>
            Cancel
          </button>
          <div style={{flex: 1}}></div>
          <button style={styles.nextBtn} onClick={handleNext}>
            Find Vehicles &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};

// --- STYLES (Consistent with SelectVehicle) ---
const styles = {
  pageBackground: {
    minHeight: "100vh",
    background: "#f8fafc",
    padding: "40px 20px 100px 20px",
    fontFamily: "'Inter', sans-serif",
  },
  mainContainer: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  headerSection: { marginBottom: "40px" },
  progressBarContainer: {
    width: "100%", height: "6px", background: "#e2e8f0", borderRadius: "3px", marginBottom: "20px", overflow: "hidden",
  },
  progressBarFill: {
    width: "33%", // Step 1
    height: "100%", background: "linear-gradient(90deg, #2563eb, #60a5fa)", borderRadius: "3px", transition: "width 0.3s ease",
  },
  stepIndicator: { display: "flex", flexDirection: "column", gap: "8px" },
  stepText: { textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "1px", fontWeight: "600", color: "#64748b" },
  pageTitle: { fontSize: "2rem", fontWeight: "800", color: "#0f172a", margin: 0 },
  
  contentGrid: { display: "grid", gridTemplateColumns: "1fr 350px", gap: "40px", alignItems: "start" },
  leftColumn: { display: "flex", flexDirection: "column", gap: "20px" },
  rightColumn: { display: "flex", flexDirection: "column", gap: "20px" },

  card: {
    background: "white", padding: "30px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },
  inputGroup: { marginBottom: "10px" },
  iconLabel: { fontSize: "0.9rem", fontWeight: "600", color: "#334155", marginBottom: "8px" },
  connectorLine: {
    width: "2px", height: "30px", background: "#e2e8f0", marginLeft: "10px", margin: "5px 0",
  },
  
  errorBox: {
    padding: "16px", background: "#fef2f2", border: "1px solid #fee2e2", borderRadius: "12px", color: "#ef4444", fontWeight: "500", display: "flex", alignItems: "center", gap: "8px",
  },

  mapPlaceholder: {
    height: "250px", background: "#e0f2fe", borderRadius: "16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed #bae6fd",
  },
  infoCard: { background: "white", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0" },
  infoTitle: { fontSize: "1rem", fontWeight: "700", marginBottom: "10px", color: "#0f172a" },
  benefitList: { listStyle: "none", padding: 0, margin: 0, color: "#64748b", fontSize: "0.9rem", lineHeight: "1.6" },

  footerBar: {
    position: "fixed", bottom: 0, left: 0, width: "100%", background: "white", padding: "20px 40px", boxShadow: "0 -4px 20px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", zIndex: 100, borderTop: "1px solid #e2e8f0",
  },
  nextBtn: {
    padding: "14px 32px", background: "#2563eb", color: "white", border: "none", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 10px rgba(37, 99, 235, 0.2)",
  },
  backBtn: {
    padding: "14px 24px", background: "transparent", color: "#64748b", border: "none", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer",
  },
  
  // Media Query handling for inline styles needs to be done via CSS file ideally, 
  // but this keeps structure consistent.
};

export default CreateBooking;