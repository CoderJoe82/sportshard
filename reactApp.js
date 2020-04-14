class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resetCount: 0,
      homeTeamStats: {
        shots: 0,
        score: 0,
      },
      visitingTeamStats: {
        shots: 0,
        score: 0,
      },
    };
    this.shotSound = new Audio("./assets/sounds/shoot.mp3");
    this.scoreSound = new Audio("./assets/sounds/score.mp3");
  }

  shoot = (team) => {
    const teamStatsKey = `${team}TeamStats`
    let score = this.state[teamStatsKey].score;
    this.shotSound.play()
    if (Math.random() > 0.5) {
      score += 1;

      setTimeout(() => {
        this.scoreSound.play();
      }, 500);
    }

    this.setState((state, props) => ({
      [teamStatsKey]: {
        shots: state[teamStatsKey].shots + 1,
        score
      }
    }));
  };

  resetGame = () => {
    this.setState((state, props) => ({
      resetCount: state.resetCount + 1,
      homeTeamStats: {
        shots: 0,
        score: 0
      },
      visitingTeamStats: {
        shots: 0,
        score: 0
      }
    }))
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <h1>Welcome to {this.props.venue}</h1>
          <div id="gameDisplay">
            <div className="teamHolders">
              <Team
                name={this.props.visitingTeam.name}
                logo={this.props.visitingTeam.logoSrc}
                stats={this.state.visitingTeamStats}
                handlingShots={() => this.shoot('visiting')}
              />
              <h3>
                One rummages through your trash
                <br /> without asking!!!!
              </h3>
            </div>
            <div>
              <h1>VS</h1>
              <div>
                <strong>Resets:</strong> {this.state.resetCount}
                <button onClick = {this.resetGame}>Reset Game</button>
              </div>
            </div>
            <div className="teamHolders">
              <Team
                name={this.props.homeTeam.name}
                logo={this.props.homeTeam.logoSrc}
                stats={this.state.homeTeamStats}
                handlingShots={() => this.shoot('home')}
              />
              <h3>One tresspasses on your trees daily!!!!</h3>
            </div>
          </div>
        </div>
        <div id="carnageHolder">
          <h1 id="carnageSpot">WHO WILL SURVIVE THE CARNAGE??!!!!</h1>
        </div>
      </React.Fragment>
    )
  }
}

function Team(props) {
  let shotPercentageDiv;

  if (props.stats.shots) {
    const shotPercentage = Math.round(
      (props.stats.score / props.stats.shots) * 100
    );
    shotPercentageDiv = (
      <div>
        <strong>Shooting %: {shotPercentage}</strong> 
      </div>
    );
  }
  return (
    <div className="Team">
      <h2>{props.name}</h2>
      <div>
        <img src={props.logo} alt={props.name} id="imageSizer" />
      </div>
      <div>
        <strong>Shots:</strong> {props.stats.shots}
      </div>
      <div>
        <strong>Score:</strong> {props.stats.score}
      </div>
      {shotPercentageDiv}
      <button onClick={props.handlingShots}>Shoot!</button>
    </div>
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