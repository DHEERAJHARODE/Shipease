import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBookingContext } from "../../context/BookingContext";
import { useMaps } from "../../hooks/useMaps";
import { createBooking } from "../../services/bookingService";
import { useAuth } from "../../hooks/useAuth";
import { formatCurrency } from "../../utils/helpers";

const BookingSummary = () => {
  const { pickup, drop, vehicle, distance, setDistance, price, setPrice, resetBooking } =
    useBookingContext();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { calculateDistance } = useMaps();

  useEffect(() => {
    // Mock lat/lng logic (unchanged)
    const pickupCoords = { lat: 28.6139, lng: 77.209 };
    const dropCoords = { lat: 28.7041, lng: 77.1025 };
    const d = calculateDistance(pickupCoords, dropCoords);
    setDistance(d);
  }, [pickup, drop, calculateDistance, setDistance]); // added dependencies

  const handleConfirm = async () => {
    const calculatedPrice = vehicle ? vehicle.pricePerKm * distance : 0;
    
    const bookingData = {
      userId: user?.uid || "guest", // handle potential null user
      pickup,
      drop,
      vehicle,
      distance,
      price: calculatedPrice,
      createdAt: new Date().toISOString(),
    };

    const { id, error } = await createBooking(bookingData);
    if (error) {
      alert("Error creating booking: " + error);
    } else {
      // alert("Booking confirmed! ID: " + id); // Replaced with nicer navigate/UI
      resetBooking();
      navigate("/dashboard/orders");
    }
  };

  // Guard Clause for missing data
  if (!vehicle) {
    return (
      <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h2>⚠️ Session Expired or Invalid</h2>
        <button onClick={() => navigate("/booking/create")} style={{...styles.nextBtn, marginTop: '20px'}}>Start Over</button>
      </div>
    );
  }

  const finalPrice = vehicle.pricePerKm * distance;

  return (
    <div style={styles.pageBackground}>
      <div style={styles.mainContainer}>
        
        {/* --- PROGRESS HEADER --- */}
        <div style={styles.headerSection}>
          <div style={styles.progressBarContainer}>
            <div style={styles.progressBarFill}></div>
          </div>
          <div style={styles.stepIndicator}>
            <span style={styles.stepText}>Step 3 of 3</span>
            <h2 style={styles.pageTitle}>Review & Confirm</h2>
          </div>
        </div>

        <div style={styles.contentGrid}>
          {/* --- LEFT COLUMN: ROUTE & VEHICLE DETAILS --- */}
          <div style={styles.leftColumn}>
            
            {/* Route Card */}
            <div style={styles.sectionCard}>
              <h3 style={styles.cardHeader}>Trip Details</h3>
              <div style={styles.detailRow}>
                <div style={styles.iconCircle}>📍</div>
                <div>
                  <div style={styles.label}>Pickup</div>
                  <div style={styles.value}>{pickup}</div>
                </div>
              </div>
              <div style={styles.verticalLine}></div>
              <div style={styles.detailRow}>
                <div style={styles.iconCircle}>🏁</div>
                <div>
                  <div style={styles.label}>Drop</div>
                  <div style={styles.value}>{drop}</div>
                </div>
              </div>
            </div>

            {/* Vehicle Card */}
            <div style={styles.sectionCard}>
              <h3 style={styles.cardHeader}>Vehicle Selected</h3>
              <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                <div style={{fontSize: '2.5rem', background: '#f1f5f9', padding: '10px', borderRadius: '12px'}}>
                  {/* Ideally dynamic icon based on vehicle type */}
                  🚚 
                </div>
                <div>
                  <div style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{vehicle.name}</div>
                  <div style={{color: '#64748b'}}>Capacity: {vehicle.capacity || 'Standard'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: PRICE BREAKDOWN --- */}
          <div style={styles.rightColumn}>
             <div style={styles.priceCard}>
                <h3 style={styles.cardHeader}>Fare Breakdown</h3>
                
                <div style={styles.priceRow}>
                   <span>Base Fare</span>
                   <span>₹50.00</span>
                </div>
                <div style={styles.priceRow}>
                   <span>Distance ({distance.toFixed(1)} km)</span>
                   <span>{formatCurrency(finalPrice - 50)}</span>
                </div>
                <div style={styles.priceRow}>
                   <span>Taxes & Fees</span>
                   <span>₹0.00</span>
                </div>
                
                <div style={styles.divider}></div>
                
                <div style={styles.totalRow}>
                   <span>Total</span>
                   <span style={{color: '#2563eb'}}>{formatCurrency(finalPrice)}</span>
                </div>

                <div style={{marginTop: '20px', fontSize: '0.8rem', color: '#94a3b8', textAlign: 'center'}}>
                  By confirming, you agree to our Terms of Service.
                </div>
             </div>
          </div>
        </div>

        {/* --- FOOTER ACTION BAR --- */}
        <div style={styles.footerBar}>
          <button style={styles.backBtn} onClick={() => navigate("/booking/vehicle")}>
            &larr; Change Vehicle
          </button>
          <div style={{flex: 1}}></div>
          <button style={styles.confirmBtn} onClick={handleConfirm}>
            Confirm Booking
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
    width: "100%", // Step 3
    height: "100%", background: "#22c55e", // Green for final step
    borderRadius: "3px",
  },
  stepIndicator: { display: "flex", flexDirection: "column", gap: "8px" },
  stepText: { textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "1px", fontWeight: "600", color: "#64748b" },
  pageTitle: { fontSize: "2rem", fontWeight: "800", color: "#0f172a", margin: 0 },
  
  contentGrid: { display: "grid", gridTemplateColumns: "1fr 350px", gap: "40px", alignItems: "start" },
  leftColumn: { display: "flex", flexDirection: "column", gap: "20px" },
  rightColumn: { display: "flex", flexDirection: "column", gap: "20px" },

  sectionCard: {
    background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
  },
  cardHeader: {
    fontSize: "1.1rem", fontWeight: "700", marginBottom: "20px", color: "#0f172a", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px",
  },
  detailRow: { display: "flex", gap: "15px", alignItems: "flex-start" },
  iconCircle: {
    width: "32px", height: "32px", borderRadius: "50%", background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0,
  },
  verticalLine: {
    width: "2px", height: "30px", background: "#e2e8f0", marginLeft: "15px", margin: "5px 0",
  },
  label: { fontSize: "0.8rem", color: "#64748b", fontWeight: "600", marginBottom: "4px" },
  value: { fontSize: "1rem", color: "#334155", fontWeight: "500" },

  // Price Card
  priceCard: {
    background: "white", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", position: "sticky", top: "20px",
  },
  priceRow: { display: "flex", justifyContent: "space-between", marginBottom: "12px", color: "#64748b", fontSize: "0.95rem" },
  divider: { height: "1px", background: "#e2e8f0", margin: "15px 0" },
  totalRow: { display: "flex", justifyContent: "space-between", fontSize: "1.25rem", fontWeight: "800", color: "#0f172a" },

  footerBar: {
    position: "fixed", bottom: 0, left: 0, width: "100%", background: "white", padding: "20px 40px", boxShadow: "0 -4px 20px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", zIndex: 100, borderTop: "1px solid #e2e8f0",
  },
  confirmBtn: {
    padding: "14px 32px", background: "#16a34a", // Green for confirm
    color: "white", border: "none", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer", boxShadow: "0 4px 10px rgba(22, 163, 74, 0.2)",
  },
  backBtn: {
    padding: "14px 24px", background: "transparent", color: "#64748b", border: "none", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer",
  },
  
  // Reusing nextBtn style for the error state button
  nextBtn: {
    padding: "14px 32px", background: "#2563eb", color: "white", border: "none", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer",
  },
};

export default BookingSummary;