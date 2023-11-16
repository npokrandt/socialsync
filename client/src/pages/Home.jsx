import "./pages.css";
import Header from "../components/Header"


const Home = () => {
  // this could be more dry
  <>
      <div className="home_grid">
        <section className="section_sidebar">
          <div className="gap_it">
            <a href="#elevator_pitch"
            className="anchor_style">Elevator Pitch</a>
            <br />
            <a href="#concept" className="anchor_style">Concept</a>
            <br />
            <a href="#process" className="anchor_style">Process</a>
            <br />
            <a href="#demo" className="anchor_style">Demo</a>
            <br />
            <a href="#future" className="anchor_style">Future Development</a>
            <br />
            <a href="#links" className="anchor_style">Links</a>
          </div>
        </section>
        <main className="main_grid">
          <article id='elevator_pitch'>
            <h2>Elevator Pitch</h2>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis vel adipisci consequatur modi. Ex, recusandae. Tempora eum sunt recusandae doloribus illum perferendis reprehenderit. Velit odit, explicabo ducimus nemo voluptate perspiciatis!</article>
          <article id='concept' >
            <h2>Concept</h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum dolorem hic suscipit officia, optio, corrupti possimus nihil dolore fugiat quasi dicta. Veniam similique nobis, blanditiis cupiditate maiores dolor eos suscipit.</article>
          <article id='process' >
            <h2>Process</h2>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus blanditiis molestiae consequatur eos quis totam autem impedit veritatis iste eum architecto, sint odit aliquam ipsa maxime in aut non? Aspernatur!</article>
          <article id='demo' >
            <h2>Demo</h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laboriosam earum perferendis labore non et adipisci harum accusamus est, repudiandae sit sint ipsa odio odit in natus quidem pariatur corrupti?</article>
          <img src="/calendar.png" width='350px' alt="screenshot of calendar" />
          <article id='future' >
            <h2>Future</h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores commodi repellat, cum nemo unde enim voluptatem quo debitis adipisci dolores, qui nihil velit rem molestias. Sunt soluta nisi incidunt similique!</article>
          <article id='links' >
            <h2>Links</h2>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia molestiae deserunt dolor eos. Laborum corporis eos odio laboriosam, necessitatibus amet laudantium, accusamus voluptas voluptatem explicabo obcaecati sunt iusto rem architecto.</article>
        </main>
      </div>
    </>
  );
};

export default Home;


{/* <div className="hero">
<h1 className="title">SocialSync</h1>
<p>Say goodbye to the cumbersome task of organizing hangouts.</p>
<p className="mt-5">
  With SocialSync, you can add events to your calendar for everyone to see.<br></br>
  The best part? You can do it all for the incredibly low price of $0.
</p>
<button type="button" onClick={() => window.location.assign("/login")} class="btn btn-primary btn-lg getstartedbtn">Get Started</button>
</div>
<div className="col-6">
<img className="w-100 calendar" src={calendar}></img>
</div> */}