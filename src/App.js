import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
// import Clarifai from 'clarifai';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Profile from './components/Profile/Profile';
import Modal from './components/Modal/Modal';



const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 300
      }
    }
  }
}

const initialState = {
  input: '',
  imageURL: '',
  boxes: [],
  route: 'signin',
  isProfileOpen: false,
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    age: 0,
    pet: ''
  },
  celebrityNames: [],
  probabilities: [],
  fail: false
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState(
      {
        user: {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined,
          age: data.age,
          pet: data.pet
        }
      });
  }

  calculateFaceLocation = (data) => {

    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;

      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });
  }

  celebrityDetecter = (data) => {
    return data.outputs[0].data.regions.map(celebrity => {
      const clarifaiCelebrityName = celebrity.data.concepts[0].name;
      return {
        celebrityNames: clarifaiCelebrityName,
      }
    });
  }

  probabilityDetecter = (data) => {
    return data.outputs[0].data.regions.map(celebrity => {
      const clarifaiCelebrityProb = celebrity.data.concepts[0].value;
      return {
        probabilities: clarifaiCelebrityProb,
      }
    });
  }

  displayFaceBox = (boxes) => {
    this.setState({ boxes: boxes });
  }

  displayCelebrity = (celebrityData) => {
    this.setState({ celebrityNames: celebrityData });
  }

  displayProbability = (celebrityData) => {
    this.setState({ probabilities: celebrityData });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  // Activate Cralifai function
  onButtonSubmit = () => {

    this.setState({
      fail: false
    });

    this.setState({ imageURL: this.state.input });
    fetch('https://gentle-lake-86764.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response)  {
          fetch('https://gentle-lake-86764.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
        this.displayCelebrity(this.celebrityDetecter(response));
        this.displayProbability(this.probabilityDetecter(response));
      })
      .catch(err => {
        console.log(err);
        this.setState({
          fail: true
        });
      });
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  toggleModal = () => {
    this.setState(state => ({
      ...state,
      isProfileOpen: !state.isProfileOpen,
    }));
  }

  render() {
    const { isSignedIn, imageURL, route, boxes, isProfileOpen, user } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} toggleModal={this.toggleModal}/>
        {
          isProfileOpen &&
          <Modal>
            <Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal} user={user} loadUser={this.loadUser} />
          </Modal>
        }
        {this.state.route === 'home'
          ? <div>
            <Logo />
            <Container className="container">
              <Row>
                <Col md={12}>
                  <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onButtonSubmit={this.onButtonSubmit}
                  />
                </Col>
                <Col md={6}>
                  <Rank
                    fail={this.state.fail}
                    celebrityNames={this.state.celebrityNames}
                    probabilities={this.state.probabilities}
                    name={this.state.user.name}
                    entries={this.state.user.entries}
                  />
                </Col>
                <Col md={6}>
                  <FaceRecognition boxes={boxes} imageURL={imageURL} />
                </Col>
              </Row>
            </Container>
          </div>
          : (
            route === 'signin'
              ? <Signin
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
              />
              : <Register
                onRouteChange={this.onRouteChange}
                loadUser={this.loadUser}
              />
          )
        }
      </div>
    );
  }
}

export default App;
