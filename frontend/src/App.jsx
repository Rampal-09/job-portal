import "./App.css";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import JobForm from "./pages/JobForm";

import JobList from "./pages/JobList";
import AppliedJobs from "./pages/AppliedJobs";
import FavoriteJobs from "./pages/FavoriteJobs";

function App() {
  return (
    <>
      <Signup></Signup>
      <Login></Login>
      <JobForm></JobForm>
      <JobList></JobList>
      <AppliedJobs></AppliedJobs>
      <FavoriteJobs></FavoriteJobs>
    </>
  );
}

export default App;
