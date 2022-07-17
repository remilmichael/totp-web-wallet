import LeftSidebar from "./components/LeftSidebar";
import TokenItem from "./components/TokenItem";
import TopNavbar from "./components/TopNavbar";

function DashboardComponents() {
    return (
        <>
            <LeftSidebar />
            <div className="right_bx">
                <TopNavbar />
                <TokenItem />
            </div>
        </>
    )
}

export default DashboardComponents;