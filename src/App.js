import React, {Suspense} from 'react';
import Home from './pages/home';
import Login from './pages/login';
import News from './pages/news';
import Footer from './components/footer';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import AddNews from './pages/addNews';
import AddTags from './pages/addTags';
import AddAuthors from './pages/addAuthors';
import './css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends React.Component {

  render() {
    return(
      <>
        <Suspense fallback={(<div>Loading</div>)}>
          <BrowserRouter>
            <Switch>
              <Route exact={true} path='/' render={(props) => (
                  <Home {...props}/>
              )}/>
              <Route exact={true} path='/login' render={() => (
                <div>
                  <Login />
                </div>
              )}/>
              <Route exact={true} path='/news' render={(props) => (
                <News {...props} />
              )}/>
              <Route exact={true} path='/addNews' render={(props) => (
                <AddNews {...props} />
              )}/>
              <Route exact={true} path='/addTags' render={() => (
                <AddTags />
              )}/>
              <Route exact={true} path='/addAuthors' render={() => (
                <AddAuthors />
              )}/>
            </Switch>
            <Footer />
          </BrowserRouter>
        </Suspense>
      </>
    );
  }
}

export default App;