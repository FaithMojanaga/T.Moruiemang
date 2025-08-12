import React, { useState } from "react";

const reasons = [
  "You came into my life when i had no intentions of falling for anyone, and now I can’t imagine it without you.", // Aug 8 (index 0)
  "You made this life thing easy by just texting!!",
  "you made me believe in genuinee people without even doubting you",
  "You gave me butterflies right away(gangster likee me🤣❤️).",
  "You are soft and gentle with me (see how you call me \"my baby\" — it has me weak,like geeeeezz 🥺😫😫😫).",
  "Your intelligence is magnetic (omwwwww i just love your mindset🥺🥺🥺🥺) it’s one of my favorite things about you.(Probably why i want your surname)",
  "I can't wait to have your last name ngl (\"Let me ask my Man pele,\" (yeahh he said No)) 💅.",
  "I love an educated man who keeps me on my toes and inspires me to grow.(Maths wa mpalela tota)",
  "You’re funny in a way that makes me laugh out loud, not just “lol” in text.",
  "I prayed for you,God knew what He was doing when He made you. -Song of Solomon 6:4",
  "Every moment talking to you feels like a blessing.",
  "I love how calm you are",
  "You make me feel seen, even in just a few days.",
  "You make me feel heard.",
  "You’re the plot twist I didn’t see coming.",
  "You make me want to be better for myself and for us.",
  "You’re dangerously easy to like.",
  "I want our kids to have your smile one day,ngl i do want to have a Family with you .",
  "You can make me laugh even when I don’t want to.",
  "You make our chats feel like we’re sitting right next to each other.",
  "You’re confident without being arrogant.",
  "You remember small details I didn’t think you’d notice.",
  "O laitaq ao😭😭😭",
  "I love you!!"
];

const startDate = new Date("2025-08-08");
const endDate = new Date("2025-08-31");

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

export default function App() {
  const [selectedDateIndex, setSelectedDateIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [readDays, setReadDays] = useState(() => {
    const saved = localStorage.getItem("readDays");
    return saved ? JSON.parse(saved) : [];
  });

  const today = new Date();
  const todayClamped =
    today < startDate ? startDate : today > endDate ? endDate : today;

  // August 2025 starts on a Friday, August 1
  const firstOfMonth = new Date("2025-08-01");
  const firstDayOfWeek = firstOfMonth.getDay(); // Sunday=0, Friday=5
  const padBefore = firstDayOfWeek;

  function handleDateClick(dayNum) {
    const clickedDate = new Date(`2025-08-${String(dayNum).padStart(2, "0")}`);

    if (clickedDate < startDate) {
      setMessage("This day is before we started talking.");
      setSelectedDateIndex(null);
      return;
    }

    if (clickedDate > todayClamped) {
      setMessage("Come again tomorrow!");
      setSelectedDateIndex(null);
      return;
    }

    setMessage("");
    const reasonIndex = dayNum - startDate.getDate();
    setSelectedDateIndex(reasonIndex);

    if (!readDays.includes(reasonIndex)) {
      const newReadDays = [...readDays, reasonIndex];
      setReadDays(newReadDays);
      localStorage.setItem("readDays", JSON.stringify(newReadDays));
    }
  }

  const calendarCells = [];
  const totalCells = 42; // 6 weeks x 7 days

  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - padBefore + 1;

    if (dayNum < 1 || dayNum > 31) {
      calendarCells.push(<div key={i} style={styles.cellEmpty}></div>);
    } else {
      const dateObj = new Date(`2025-08-${String(dayNum).padStart(2, "0")}`);
      const isBeforeStart = dateObj < startDate;
      const isFuture = dateObj > todayClamped;
      const isToday = dateObj.toDateString() === todayClamped.toDateString();
      const reasonIndex = dayNum - startDate.getDate();
      const isSelected = selectedDateIndex === reasonIndex;
      const isRead = readDays.includes(reasonIndex);

      if (isBeforeStart) {
        calendarCells.push(
          <div
            key={i}
            style={styles.cellDisabled}
            title="This day is before we started talking"
          >
            {dayNum}
          </div>
        );
      } else {
        calendarCells.push(
          <button
            key={i}
            disabled={isFuture}
            onClick={() => handleDateClick(dayNum)}
            style={{
              ...styles.cellButton,
              backgroundColor: isSelected
                ? "#1e40af"
                : isToday
                ? "#ffe066"
                : "#fcefee",
              color: isFuture ? "#ccc" : isSelected ? "#ffecb3" : "#b3003b",
              textDecoration: isRead ? "line-through" : "none",
              cursor: isFuture ? "not-allowed" : "pointer",
              borderColor: "#b3003b",
              fontWeight: "bold",
              boxShadow: isSelected ? "0 0 10px #facc15" : "none",
              position: "relative",
              fontSize: 14,
              padding: 8,
            }}
            title={
              isToday
                ? "Today"
                : dayNum === 8
                ? "We started talking here! 💬"
                : formatDate(dateObj)
            }
          >
            {dayNum}
            {dayNum === 8 && (
              <span style={styles.marker} aria-label="Started talking">
                💬
              </span>
            )}
          </button>
        );
      }
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
       <img
  src="https://upload.wikimedia.org/wikipedia/en/3/35/Supermanflying.png"
  alt="Superman Logo"
  style={{ width: 80, height: 80 }}
/>

        <h1 style={{ marginLeft: 10, color: "#1e40af", fontSize: "1.3rem" }}>
          Reasons Why I Want to Do This Life Thing With You
        </h1>
      </div>

      <h2 style={{ color: "#b3003b", marginBottom: 20, fontSize: "1.1rem" }}>
        August 2025
      </h2>

      <div style={styles.calendarGrid}>
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} style={styles.weekdayHeader}>
            {day}
          </div>
        ))}

        {calendarCells}
      </div>

      {message && (
        <p
          style={{
            color: "red",
            fontWeight: "bold",
            fontSize: 14,
            marginTop: 10,
          }}
        >
          {message}
        </p>
      )}

      {selectedDateIndex !== null && !message && (
        <div style={styles.reasonBox}>
          <strong>
            {formatDate(
              new Date(2025, 7, selectedDateIndex + startDate.getDate())
            )}
          </strong>
          : {reasons[selectedDateIndex]}
        </div>
      )}

      {selectedDateIndex === null && !message && (
        <p style={{ fontSize: 14, color: "#555", marginTop: 10 }}>
          Select a date from August 8 to today to see your reason!
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: 400,
    margin: "20px auto",
    textAlign: "center",
    backgroundColor: "#f0f8ff",
    padding: 15,
    borderRadius: 12,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    flexWrap: "wrap",
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 4,
    marginBottom: 20,
  },
  weekdayHeader: {
    fontWeight: "bold",
    padding: "6px 0",
    color: "#1e40af", // Superman blue
    fontSize: 12,
  },
  cellEmpty: {
    backgroundColor: "#f8f8f8",
  },
  cellDisabled: {
    padding: 8,
    color: "#ccc",
    fontSize: 14,
  },
  cellButton: {
    padding: 8,
    border: "2px solid",
    borderRadius: 5,
    backgroundColor: "#fcefee", // soft pink background
    fontWeight: "bold",
    fontSize: 14,
    transition: "all 0.2s ease-in-out",
    position: "relative",
  },
  reasonBox: {
    backgroundColor: "#fff0f5",
    padding: 15,
    borderRadius: 10,
    boxShadow: "0 0 10px rgba(179,0,59,0.3)",
    fontSize: 14,
    minHeight: 90,
    marginTop: 10,
  },
  marker: {
    position: "absolute",
    top: 1,
    right: 3,
    fontSize: 12,
  },
};
