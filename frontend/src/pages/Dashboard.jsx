/*import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import "../styles.css";
import { getSensorData } from "../api";

export default function Dashboard() {
  const [moisture, setMoisture] = useState("--");
  const [flow, setFlow] = useState("--");
  const [valve, setValve] = useState("--");

  const moistureChartRef = useRef(null);
  const flowChartRef = useRef(null);

  const moistureChartInstance = useRef(null);
  const flowChartInstance = useRef(null);

  // Protect dashboard: redirect if no token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/";
  }, []);

  useEffect(() => {
    // Initialize charts
    if (moistureChartRef.current) {
      moistureChartInstance.current = new Chart(moistureChartRef.current, {
        type: "line",
        data: { labels: [], datasets: [{ label: "Soil Moisture (%)", data: [], borderColor: "#2e7d32", fill: false, tension: 0.3 }] },
        options: { responsive: true, animation: false, scales: { y: { beginAtZero: true, max: 100 } } },
      });
    }

    if (flowChartRef.current) {
      flowChartInstance.current = new Chart(flowChartRef.current, {
        type: "line",
        data: { labels: [], datasets: [{ label: "Water Flow (L/min)", data: [], borderColor: "#0288d1", fill: false, tension: 0.3 }] },
        options: { responsive: true, animation: false, scales: { y: { beginAtZero: true, max: 5 } } },
      });
    }

    const updateData = async () => {
      try {
        const data = await getSensorData();
        if (!data) return;

        setMoisture(data.moisture);
        setFlow(data.flow);
        setValve(data.valve);

        const time = new Date().toLocaleTimeString();

        const mChart = moistureChartInstance.current;
        const fChart = flowChartInstance.current;

        if (mChart && fChart) {
          if (mChart.data.labels.length > 10) {
            mChart.data.labels.shift();
            mChart.data.datasets[0].data.shift();
            fChart.data.labels.shift();
            fChart.data.datasets[0].data.shift();
          }

          mChart.data.labels.push(time);
          mChart.data.datasets[0].data.push(data.moisture);

          fChart.data.labels.push(time);
          fChart.data.datasets[0].data.push(data.flow);

          mChart.update();
          fChart.update();
        }
      } catch (err) {
        console.error("Failed to fetch sensor data:", err);
      }
    };

    const interval = setInterval(updateData, 2000);
    updateData();

    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="dashboard">
      <h1>💧 Drip Irrigation Dashboard</h1>

      <div className="sensor-grid">
        <div className="card">
          <h3>Soil Moisture</h3>
          <p>{moisture} %</p>
        </div>

        <div className="card">
          <h3>Water Flow</h3>
          <p>{flow} L/min</p>
        </div>

        <div className="card">
          <h3>Valve Status</h3>
          <p>{valve}</p>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <canvas ref={moistureChartRef}></canvas>
        </div>

        <div className="chart-container">
          <canvas ref={flowChartRef}></canvas>
        </div>
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );
}
*/
 
import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import "../styles.css";

// Dummy data for visualization
//const dummySensors = [
 // { id: 1, name: "Soil Moisture Sensor 1", type: "moisture", location: "Field 1" },
 // { id: 2, name: "Flow Sensor 1", type: "flow", location: "Field 1" },
// ];

const dummyValves = [
  { id: 1, name: "Valve 1", status: true },
  { id: 2, name: "Valve 2", status: false },
];

const dummySchedules = [
  { id: 1, valve: "Valve 1", startTime: "06:00 AM", duration: 30, days: ["Mon", "Wed", "Fri"] },
  { id: 2, valve: "Valve 2", startTime: "07:00 AM", duration: 20, days: ["Tue", "Thu", "Sat"] },
];

export default function Dashboard() {
  const [moisture, setMoisture] = useState(0);
  const [flow, setFlow] = useState(0);
  const [valves, setValves] = useState(dummyValves);

  const moistureChartRef = useRef(null);
  const flowChartRef = useRef(null);

  const moistureChartInstance = useRef(null);
  const flowChartInstance = useRef(null);

  // Protect dashboard: redirect if no token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) window.location.href = "/login";
  }, []);

  // Initialize charts
  useEffect(() => {
    if (moistureChartRef.current) {
      moistureChartInstance.current = new Chart(moistureChartRef.current, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "Soil Moisture (%)",
              data: [],
              borderColor: "#2e7d32",
              fill: false,
              tension: 0.3,
            },
          ],
        },
        options: { responsive: true, animation: false, scales: { y: { beginAtZero: true, max: 100 } } },
      });
    }

    if (flowChartRef.current) {
      flowChartInstance.current = new Chart(flowChartRef.current, {
        type: "line",
        data: {
          labels: [],
          datasets: [
            {
              label: "Water Flow (L/min)",
              data: [],
              borderColor: "#0288d1",
              fill: false,
              tension: 0.3,
            },
          ],
        },
        options: { responsive: true, animation: false, scales: { y: { beginAtZero: true, max: 5 } } },
      });
    }
  }, []);

  // Simulate sensor data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newMoisture = Math.floor(Math.random() * 100);
      const newFlow = (Math.random() * 5).toFixed(2);

      setMoisture(newMoisture);
      setFlow(newFlow);

      const time = new Date().toLocaleTimeString();

      // Update moisture chart
      const mChart = moistureChartInstance.current;
      if (mChart) {
        if (mChart.data.labels.length > 10) {
          mChart.data.labels.shift();
          mChart.data.datasets[0].data.shift();
        }
        mChart.data.labels.push(time);
        mChart.data.datasets[0].data.push(newMoisture);
        mChart.update();
      }

      // Update flow chart
      const fChart = flowChartInstance.current;
      if (fChart) {
        if (fChart.data.labels.length > 10) {
          fChart.data.labels.shift();
          fChart.data.datasets[0].data.shift();
        }
        fChart.data.labels.push(time);
        fChart.data.datasets[0].data.push(newFlow);
        fChart.update();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Toggle valve status
  const toggleValve = (id) => {
    setValves((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: !v.status } : v))
    );
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="dashboard">
      <h1>💧 Drip Irrigation Dashboard</h1>

      <button className="logout-btn" onClick={logout}>Logout</button>

      <div className="sensor-grid">
        <div className="card">
          <h3>Soil Moisture</h3>
          <p>{moisture} %</p>
        </div>
        <div className="card">
          <h3>Water Flow</h3>
          <p>{flow} L/min</p>
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <canvas ref={moistureChartRef}></canvas>
        </div>
        <div className="chart-container">
          <canvas ref={flowChartRef}></canvas>
        </div>
      </div>

      <h2>Valves</h2>
      <div className="valve-grid">
        {valves.map((v) => (
          <div key={v.id} className="card valve-card">
            <h4>{v.name}</h4>
            <p>Status: {v.status ? "Open" : "Closed"}</p>
            <button onClick={() => toggleValve(v.id)}>
              {v.status ? "Close" : "Open"}
            </button>
          </div>
        ))}
      </div>

      <h2>Schedules</h2>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Valve</th>
            <th>Start Time</th>
            <th>Duration (min)</th>
            <th>Days</th>
          </tr>
        </thead>
        <tbody>
          {dummySchedules.map((s) => (
            <tr key={s.id}>
              <td>{s.valve}</td>
              <td>{s.startTime}</td>
              <td>{s.duration}</td>
              <td>{s.days.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}



