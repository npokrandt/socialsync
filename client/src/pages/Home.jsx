import "./pages.css";
import Header from "../components/Header";

const Home = () => {
  // this could be more dry
  return (
    <>
      <div className="h_style">
        <Header>Welcome to SocialSync</Header>
      </div>

      <div className="home_grid">
        <div className="hero">
          <h1 className="title">SocialSync</h1>
          <p>Say goodbye to the cumbersome task of organizing hangouts.</p>
          <p className="mt-5">
            With SocialSync, you can add events to your calendar for everyone to see.<br></br>
            The best part? You can do it all for the incredibly low price of $0.
          </p>
          <button type="button" onClick={() => window.location.assign("/login")} class="btn btn-primary btn-lg getstartedbtn">
            Get Started
          </button>
        </div>
        <div className="col">
          <img className="w-100 calendar" src="./calendar.png"></img>
        </div>
      </div>
    </>
  );
};

export default Home;
