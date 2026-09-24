import { Cake } from "lucide-react";
import WorldClock from "./WorldClock";
import "../styles/DashboardRightSidebar.css";
type Activity = {
  id: number;
  title: string;
  description: string;
  time: string;
};

type DashboardRightSidebarProps = {
  birthdayCount?: number;
  birthdaySummary?: string;
  activities?: Activity[];
};

export default function DashboardRightSidebar({
  birthdayCount = 0,
  birthdaySummary = "No birthdays this week",
  activities = [],
}: DashboardRightSidebarProps) {
  return (
    <aside className="dashboard-right">

      {/* Birthdays */}
      <section className="dashboard-card birthdays-card">
        <button className="birthdays-button">

          <div className="birthdays-main">
            <div className="birthdays-icon">
              <Cake />
            </div>

            <div className="birthdays-count">
              <strong>{birthdayCount}</strong>
              <span>Birthdays this week</span>
            </div>
          </div>

          <div className="birthdays-summary">
            <span>{birthdaySummary}</span>
          </div>

        </button>
      </section>


      {/* Recent Activities */}
      <section className="activities-card">

        <div className="card-header">
          <h2>RECENT ACTIVITIES</h2>

          <a href="/activities">
            VIEW ALL
          </a>
        </div>

        <div className="activities-list">

          {activities.map((activity) => (
            <div className="activity-item" key={activity.id}>

              <div className="activity-dot"></div>

              <div className="activity-info">
                <a>{activity.title}</a>
                <span>
                  {activity.description} · {activity.time}
                </span>
              </div>

            </div>
          ))}

        </div>

        <button className="notification-button">
          + Notification
        </button>

      </section>
      <WorldClock/>

    </aside>
  );
}