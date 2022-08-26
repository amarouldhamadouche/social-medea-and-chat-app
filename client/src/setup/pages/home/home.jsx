import Topbar from "../../components/topbar/topbar.jsx";
import Sidebar from "../../components/sidebar/sidebar.jsx";
import Feed from "../../components/feed/feed.jsx";
import Rightbar from "../../components/rightbar/rightbar.jsx";
import "./home.css";
export default function Home() {
  return (
    <>
      <Topbar />
      <div className="homecontainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
}
