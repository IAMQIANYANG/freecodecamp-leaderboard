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
    <div key={item.username} className="row">
      <span className="col-md-2" />
      <span className="table-cell col-md-4"> <img alt="Avatar" src={item.img} />{item.username} </span>
      <span className="table-cell col-md-2"> {item.recent}</span>
      <span className="table-cell col-md-2"> {item.alltime}</span>
      <span className="col-md-2" />
    </div>
  )}
  </div>;


const Button = ({onClick, children}) =>
  <button onClick={onClick}> {children} </button>;


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
    const toFetch = type === 'month'? PATH_MONTH : PATH_ALLTIME;
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
      <div className="row">
        <TableHeader />
        {monthLeader? <TableRow monthList={monthLeader}/> : null}
      </div>
    )
  }
}

export default LeaderTable
