import LeftSidebar from "./components/LeftSidebar";
import TopNavbar from "./components/TopNavbar";

function DashboardComponents() {
    return (
        <>
            <LeftSidebar />
            <div className="right_bx">
                <TopNavbar />
            </div>
        </>
    )
}

export default DashboardComponents;