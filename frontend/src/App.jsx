import "./App.css";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import JobForm from "./pages/JobForm";
import JobCard from "./pages/JobCard";
import JobList from "./pages/JobList";

function App() {
  return (
    <>
      <Signup></Signup>
      <Login></Login>
      {/* <JobForm></JobForm> */}
      <JobList></JobList>
    </>
  );
}

export default App;
