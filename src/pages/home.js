import React from 'react';
import NewsList from '../components/newsList';
import Sidebar from '../components/sidebar';
import Header from '../components/header';

export default class Home extends React.Component {

  render() {
    return(
      <div>
        <Header />
        <Sidebar />
        <NewsList />
      </div>
    );
  }

}