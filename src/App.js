import React, { Component } from 'react'
import './App.css'

const PATH_ALLTIME = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
const PATH_MONTH = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';

const TableHeader = () =>
  <div>
    <span>#</span>
    <span>Camper Name</span>
    <span>Points in last 30 days</span>
    <span>All time points</span>
  </div>;


const TableRow = ({monthList}) =>
  <div>{monthList.map(item =>
    <div>
      <span> {item.username} </span>
      <span> {item.recent}</span>
      <span> {item.alltime}</span>
    </div>
  )}
  </div>;


class LeaderTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthLeader: null,
      allTimeLeader: null
    };

    this.fetchLeader = this.fetchLeader.bind(this);
    this.setResult = this.setResult.bind(this);

  }

  fetchLeader(type){
    const toFetch = type === 'month'? PATH_MONTH : PATH_ALLTIME
    fetch(toFetch)
      .then(response => response.json())
      .then(result => this.setResult(result, type))
  }

  setResult(result, type) {
    type === "month"? this.setState({monthLeader: result}) : this.setState({allTimeLeader: result})
  }

  componentDidMount() {
    this.fetchLeader('month');
    this.fetchLeader('alltime');
  }

  render() {
    const { monthLeader, allTimeLeader } = this.state;
    return (
      <div>
        <TableHeader />
        {monthLeader? <TableRow monthList={monthLeader}/> : null}
      </div>
    )
  }
}

export default LeaderTable
