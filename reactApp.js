class Team extends React.Component {
  constructor(props) {
    super(props);

    this.shotSound = new Audio("./assets/sounds/shoot.mp3");
    this.scoreSound = new Audio("./assets/sounds/score.mp3");

    this.state = {
      shots: 0,
      score: 0,
    };
  }

  handleShot = () => {
    let score = this.state.score;
    this.shotSound.play();
    if (Math.random() > 0.5) {
      score += 1;

      setTimeout(() => {
        this.scoreSound.play();
      }, 500);
    }

    console.log("shoot!");
    this.setState((state, props) => ({
      shots: state.shots + 1,
      score,
    }));
  };

  render() {
    let shotPercentageDiv;

    if (this.state.shots) {
      const shotPercentage = Math.round(
        (this.state.score / this.state.shots) * 100
      );
      shotPercentageDiv = (
        <div>
          <strong>Shooting %: </strong> {shotPercentage}
        </div>
      );
    }
    return (
      <div className="Team">
        <h2>{this.props.name}</h2>
        <div>
          <img
            src={this.props.logo}
            alt={this.props.name}
            id="imageSizer"
          />
        </div>
        <div>
          <strong>Shots:</strong> {this.state.shots}
        </div>
        <div>
          <strong>Score:</strong> {this.state.score}
        </div>
        {shotPercentageDiv}
        <button onClick={this.handleShot}>Shoot!</button>
      </div>
    );
  }
}

function Game(props) {
  return (
    <React.Fragment>
      <div>
        <h1>Welcome to {props.venue}</h1>
        <div id="gameDisplay">
          <div className="teamHolders">
            <Team
              name={props.visitingTeam.name}
              logo={props.visitingTeam.logoSrc}
            />
            <h3>
              One rummages through your trash
              <br /> without asking!!!!
            </h3>
          </div>
          <div>
            <h1>VS</h1>
          </div>
          <div className="teamHolders">
            <Team
              name={props.homeTeam.name}
              logo={props.homeTeam.logoSrc}
            />
            <h3>One tresspasses on your trees daily!!!!</h3>
          </div>
        </div>
      </div>
      <div id="carnageHolder">
        <h1 id="carnageSpot">WHO WILL SURVIVE THE CARNAGE??!!!!</h1>
      </div>
    </React.Fragment>
  );
}

// Deafault App component that all other compents are rendered through
function App(props) {
  const raccoons = {
    name: "Russiaville Raccoons",
    logoSrc: "./assets/images/raccoon.jpg",
  };
  const squirrels = {
    name: "Sheridan Squirrels",
    logoSrc: "./assets/images/squirrel.jpg",
  };
  const bunnies = {
    name: "Burlington Bunnies",
    logoSrc: "./assets/images/bunny.png",
  };
  const hounds = {
    name: "Hammond Hounds",
    logoSrc: "./assets/images/hound.jpg",
  };
  return (
    <div className="App">
      <Game
        venue="Union 525 Gem"
        homeTeam={squirrels}
        visitingTeam={raccoons}
      />
      <Game venue="Sheridan Arena" homeTeam={bunnies} visitingTeam={hounds} />
    </div>
  );
}

//Render the application
ReactDOM.render(<App />, document.getElementById("root"));
