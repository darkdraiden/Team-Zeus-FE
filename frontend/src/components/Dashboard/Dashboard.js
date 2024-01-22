import React from "react";
import "./dashboard.css";
function Dashboard() {
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebar = document.getElementById("sidebar");

  // sidebarToggle.addEventListener("click", () => {
  //   sidebar.style.visibility =
  //     sidebar.style.visibility === "hidden" ? "visible" : "hidden";
  // });
  return <>
    {/* <div id="sidebar"></div>; */}
    <button id="sidebar-toggle">Toggle sidebar</button>
  </>
}

export default Dashboard;
