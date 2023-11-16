import "./pages.css";
import calendar from "/calendar.png"
import AuthService from "../utils/auth"

const Home = () => {
  return (
    <div className="row m-4">
      <div className="col-6">
        <h1 className="title">SocialSync</h1>
        <p>Say goodbye to the cumbersome task of organizing hangouts.</p>
        <p className="mt-5">
          With SocialSync, you can add events to your calendar for everyone to see.<br></br>
          The best part? You can do it all for the incredibly low price of $0.
        </p>
        <button
          type="button"
          onClick={() => window.location.assign(
            AuthService.loggedIn() ? `/users/${AuthService.getProfile()?.data?._id}` : "/login")}
          className="btn btn-primary btn-lg getstartedbtn">
            Get Started
        </button>
      </div>
      <div className="col-6">
        <img className="w-100 calendar" src={calendar}></img>
      </div>
    </div>
  );
};

export default Home;
