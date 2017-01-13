import React, { Component } from 'react'
import './App.css'
import { sortBy } from 'lodash'
import FontAwesome from 'react-fontawesome';


const PATH_ALLTIME = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
const PATH_MONTH = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';

const SORTS = {
  month: list => sortBy(list, 'recent').reverse(),
  alltime: list => sortBy(list, 'alltime').reverse()
};

const TableHeader = ({onSort, sortKey}) =>
  <div>
    <div className="row title"> Free code camp Leaderboard</div>
    <div className="row header">
      <span className="col-md-2" />
      <span className="table-cell col-md-1">Ranking</span>
      <span className="table-cell col-md-3">Camper Name</span>
      <span className="table-cell col-md-2"><Button onClick={() => onSort('month')}>Points in last 30 days
        {sortKey === 'month'? <FontAwesome name='arrow-down' size='1x'/> : ''}
         </Button></span>
      <span className="table-cell col-md-2"><Button onClick={() => onSort('alltime')}>All time points
        {sortKey === 'alltime'? <FontAwesome name='arrow-down' size='1x'/> : ''}
      </Button></span>
      <span className="col-md-2" />
    </div>
  </div>;


const TableRow = ({monthList, allTimeList, sortKey }) => {
  const sortedList = sortKey === 'month'? SORTS['month'](monthList) : SORTS['alltime'](allTimeList);

  return (
    <div>{sortedList.map((item,i) =>
      <div key={item.username} className="row">
        <span className="col-md-2" />
        <span className="table-cell col-md-1"> {i + 1}</span>
        <span className="camper-info col-md-3"> <img alt="Avatar" src={item.img} />{item.username} </span>
        <span className="table-cell col-md-2"> {item.recent}</span>
        <span className="table-cell col-md-2"> {item.alltime}</span>
        <span className="col-md-2" />
      </div>
    )}
    </div>
    )
};

const Button = ({onClick, children}) =>
  <button onClick={onClick}> {children} </button>;

class LeaderTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monthLeader: null,
      allTimeLeader: null,
      sortKey: 'month'
    };

    this.fetchLeader = this.fetchLeader.bind(this);
    this.setResult = this.setResult.bind(this);
    this.onSort = this.onSort.bind(this)

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

  onSort(sortKey) {
    this.setState({sortKey});
 }

  render() {
    const { monthLeader, allTimeLeader, sortKey} = this.state;
    return (
      <div className="row">
        <TableHeader sortKey={sortKey} onSort={this.onSort}/>
        {monthLeader? <TableRow monthList={monthLeader} allTimeList={allTimeLeader} sortKey={sortKey}/> : null}
      </div>
    )
  }
}

export default LeaderTable
