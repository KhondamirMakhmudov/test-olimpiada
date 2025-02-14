import DashboardNav from "@/components/dashboard-nav";
import Sidebar from "@/components/dashboard/sidebar";
import Brand from "@/components/brand";
import MainContent from "@/components/dashboard/main";

const Dashboard = ({ children }) => {
  return (
    <div className={"flex"}>
      <Sidebar>
        <Brand />

        <DashboardNav />
      </Sidebar>

      <MainContent>{children}</MainContent>
    </div>
  );
};

export default Dashboard;
