import Sidebar from "../components/Sidebar";
import { useState } from "react";
import "../styles/DasboardLayout.css"



export default function DashboardLayout() {

const [activeTab, setActiveTab] = useState<"dates" | "files">("dates");

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
         <section className="dashboard-card upcoming-card">
             <div className="dashboard-tabs"> 
                <button className={`dashboard-tab ${ activeTab === "dates" ? "active" : "" }`} onClick={() => setActiveTab("dates")} > Upcoming Dates </button> 
                <button className={`dashboard-tab ${ activeTab === "files" ? "active" : "" }`} onClick={() => setActiveTab("files")} > Files </button> 
            </div>
             {/* Upcoming dates */} 
             {activeTab === "dates" && ( 
                <div className="dashboard-list"> 
                    <div className="dashboard-list-item"> 
                          <div className="date-box"> 
                          <span>18</span> <small>SEP</small> 
                          </div>
                    <div className="list-info"> 
                             <strong>Training Session</strong> 
                             <span>10:00 AM</span> 
                    </div> 
                </div>
                
                <div className="dashboard-list-item"> 
                    <div className="date-box"> 
                        <span>22</span> <small>SEP</small> 
                    </div> 
                         <div className="list-info"> 
                            
                             <strong>Club Meeting</strong> <span>02:00 PM</span> 
                         </div> 
                    </div> 
                    
                <div className="dashboard-list-item"> 
                    <div className="date-box"> <span>25</span> <small>SEP</small> 
                    </div> 
                <div className="list-info"> <strong>Athlete Event</strong> <span>09:30 AM</span> 
                     </div> 
                </div> 
                <div className="dashboard-list-item"> 
                    <div className="date-box"> <span>30</span> <small>SEP</small> </div> 
                    <div className="list-info"> <strong>Competition</strong> <span>06:00 PM</span> </div> 
                </div>
                
                 </div> )} {/* Files */} {activeTab === "files" && ( 
                    <div className="dashboard-list"> 
                        <div className="dashboard-list-item">  
                            <div className="file-icon"> 📄 </div> 
                                <div className="list-info"> <strong>Athlete Documents</strong> 
                                      <span>Updated today</span> </div>
                                 </div> 
                        <div className="dashboard-list-item"> 
                            <div className="file-icon"> 📄 </div> 
                                  <div className="list-info"> <strong>Club Documents</strong>
                                   <span>Updated yesterday</span> 
                                   </div> 
                            </div>
                     <div className="dashboard-list-item"> 
                        <div className="file-icon"> 📄 </div> 
                        <div className="list-info"> 
                            <strong>Contracts</strong> 
                                <span>Updated 2 days ago</span>
                         </div> 
                        </div>
                        
                 <div className="dashboard-list-item"> 
                    <div className="file-icon"> 📄 </div> 
                         <div className="list-info"> 
                            <strong>Medical Files</strong> 
                                    <span>Updated 3 days ago</span> 
                         </div> 
                    </div> 
                </div> )} 
           </section> 
           </div>
                  <aside className="dashboard-right">

      {/* Birthdays */}
      <section className="dashboard-card birthdays-card">

        <div className="card-header">
          <h2>Birthdays</h2>

          <a href="/birthdays">
            View birthdays
          </a>
        </div>

        <div className="birthday-content">

          <div className="birthday-item">
            <div className="avatar">
              JD
            </div>

            <div>
              <strong>John Doe</strong>
              <span>Today</span>
            </div>
          </div>

          <div className="birthday-item">
            <div className="avatar">
              AM
            </div>

            <div>
              <strong>Anna Martin</strong>
              <span>Tomorrow</span>
            </div>
          </div>

        </div>

      </section>


      {/* Recent Activities */}
      <section className="dashboard-card activities-card">

        <div className="card-header">

          <h2>Recent Activities</h2>

          <a href="/activities">
            View All
          </a>

        </div>

        <div className="activities-list">

          <div className="activity-item">
            <div className="activity-dot"></div>

            <div className="activity-info">
              <strong>New athlete added</strong>
              <span>John Doe · 10 min ago</span>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-dot"></div>

            <div className="activity-info">
              <strong>Club information updated</strong>
              <span>Paris Club · 1 hour ago</span>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-dot"></div>

            <div className="activity-info">
              <strong>New file uploaded</strong>
              <span>Contract.pdf · 2 hours ago</span>
            </div>
          </div>

          <div className="activity-item">
            <div className="activity-dot"></div>

            <div className="activity-info">
              <strong>New event created</strong>
              <span>Training Session · 3 hours ago</span>
            </div>
          </div>

        </div>

        <button className="notification-button">
          + Notification
        </button>

      </section>

    </aside>

                    </div>
      </main>
    </div>
  );
}