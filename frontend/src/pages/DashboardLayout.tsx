import DashboardRightSidebar from "../components/DashboardRighSiderbar";
import Sidebar from "../components/Sidebar";

import "../styles/DasboardLayout.css"
import { Cake } from "lucide-react";



export default function DashboardLayout() {



  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-content">
         <div className="dashboard-layout">
            
             <div className="dashboard-main">
         <section className="dashboard-actions"> 
            <div className="dashboard-welcome"> 
                <h1>DASHBOARD</h1> 
               
            </div>
             <div className="dashboard-buttons"> 
                <button className="dashboard-action-button"> 
                    <span className="action-icon">⚑</span> 
                    <span>ADD NEW CLUB</span> 
                </button> 
                <button className="dashboard-action-button"> 
                    <span className="action-icon">♙</span> 
                    <span>ADD A NEW ATHLETE</span> 
                </button> 
                <button className="dashboard-action-button"> 
                    <span className="action-icon">▤</span> 
                    <span>UPLOAD FILE</span> 
                </button> 
            </div> 
          </section> 
        <div className="dashboard-sections">

  {/* Upcoming Dates */}
  <section className="dashboard-card upcoming-card">
    <div className="card-header">
      <h2>UPCOMING DATES</h2>
      
    </div>

    <div className="dashboard-list">
      <div className="dashboard-list-item">
        <div className="date-box">
          <span >18</span>
          <small>SEP</small>
        </div>
            <span className="event-name">10:00</span>
            <div className="event">
               <strong className="event-time">MEETING WITH JAMES J. JUVENTUS</strong>
               <small>lorem ipsum dolor sit amet</small>
            </div>
           
         
        
      </div>

      <div className="dashboard-list-item">
        <div className="date-box">
          <span>22</span>
          <small>SEP</small>
        </div>
        <span className="event-name">02:00 </span>
        <div className="event">
              <strong className="event-time" >MEETING WITH JAMES J. JUVENTUS</strong>
              <small>lorem ipsum dolor sit amet</small>
        </div>
        
       
      </div>

      <div className="dashboard-list-item">
        <div className="date-box">
          <span >25</span>
          <small>SEP</small>
        </div>
           <span className="event-name">09:30 </span>
           <div className="event">
             <strong className="event-time">MEETING WITH JAMES J. JUVENTUS</strong>
             <small>lorem ipsum dolor sit amet</small>
           </div>
          
        
      </div>

      
      
    </div>

    <a href="#"  className="upcoming-view-all">VIEW ALL</a>
  </section>


  {/* Files */}
  <section className="dashboard-card files-card">
    <div className="card-header">
      <h2>FILES</h2>
      
    </div>

    <div className="files-list">
      <a href="#" className="file-link">
        <span className="file-icon">📄</span>
        <div className="event">
         <span>ATHLETE DOCUMENTS</span>
        <small>Updated today</small>
        </div>
        
      </a>

      <a href="#" className="file-link">
        <span className="file-icon">📄</span>
        <div className="event">
         <span>CLUB DOCUMENTS</span>
        <small>Updated today</small>
        </div>
        
      </a>

      <a href="#" className="file-link">
        <span className="file-icon">📄</span>
        <div className="event">
        <span>CONTRACTS</span>
        <small>Updated today</small>
        </div>
        
      </a>

      
    </div>
    <a href="#" className="upcoming-view-all">VIEW ALL</a>
  </section>

</div>
           </div>
           

     <DashboardRightSidebar/>
                    </div>
      </main>
    </div>
  );
}