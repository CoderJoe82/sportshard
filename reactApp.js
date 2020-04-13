class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shots: 0,
      score: 0,
    };
  }

  handleShot = () => {
    let score = this.state.score;

    if (Math.random() > 0.5) {
      score += 1;
    }

    console.log("shoot!");
    this.setState((state, props) => ({
      shots: state.shots + 1,
      score,
    }));
  };

  render() {
    return (
      <div className="Team">
        <h2>{this.props.name}</h2>
        <div>
          <img
            src={this.props.logo}
            alt={this.props.name}
            alt="team logo"
            id="imageSizer"
          />
        </div>
        <div>
          <strong>Shots:</strong> {this.state.shots}
        </div>
        <div>
          <strong>Score:</strong> {this.state.score}
        </div>
        <button onClick={this.handleShot}>Shoot!</button>
      </div>
    );
  }
}

// Deafault App component that all other compents are rendered through
function App(props) {
  return (
    <React.Fragment>
      <div id="gameDisplay">
        <div className="teamHolders">
          <Team
            name="Russiaville Raccoons"
            logo="./assets/images/raccoon.jpg"
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
          <Team name="Sheridan Squirrels" logo="./assets/images/squirrel.jpg" />
          <h3>One tresspasses on your trees daily!!!!</h3>
        </div>
      </div>
      <div id="carnageHolder">
        <h1 id="carnageSpot">WHO WILL SURVIVE THE CARNAGE??!!!!</h1>
      </div>
    </React.Fragment>
  );
}

//Render the application
ReactDOM.render(<App />, document.getElementById("root"));
