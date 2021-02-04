import './App.css';
import React from 'react';


const movie = {
  title: "Iron Man",
  vote_everage: 11.0,
  image: "https://www.kinonews.ru/insimgs/2019/newsimg/newsimg87156.jpg",
  overview:"Best movie!!!"
}


function Image(props) {
    return  <img width="100%" src={props.src} alt={props.alt} />
}

class MovieItem extends React.Component {
  constructor() {
    super()
    
    this.state = {
      show: false,
      like: false
    };
  }
  

  toggleOverview = () => {
    this.setState({
      show: !this.state.show
    });
  };

  handleLike = () => {
    this.setState({
      like: !this.state.like
    })
  }

  render() {
    const { data: { title, vote_everage, image, overview } } = this.props;
    console.log("state", this.state);
    return (
      <div style={{ width: "200px"}}>
        <Image src={image} alt={title} />
        <p>{title}</p>
        <p>{vote_everage}</p>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="button" onClick={this.toggleOverview}>
            {this.state.show ? "Hide" : "Show" }
        </button>
          <button type="button"
            onClick={this.handleLike}
            className={this.state.like ? "btn--like" : ""}
            >
            {this.state.like ? "Unlike" : "Like"}
          </button>
          </div>
        {this.state.show ? <p>{overview}</p> : null}
      </div>
    );
 }

}


function App() {
  return (
    <div>
      <MovieItem data={movie}/>
    </div>
  );
}


export default App;
