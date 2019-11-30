import React from 'react';
import moment from 'moment';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  componentDidMount() {
    fetch('/temperature')
      .then(response => response.json())
      .then(data => { this.setState({ data: data.data })})
      .catch(err => { console.error(err); });
  }

  render() {
      const timeFormatter = (tick) => { return moment(tick).format('HH');};
      const labelFormatter = (tick) => { return moment(tick).format('DD/MM/YYYY HH:mm');};
      return (
        <div>
          <ResponsiveContainer width='100%' minHeight="500px">
            <LineChart width={600} height={300} data={this.state.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis 
              dataKey="date" 
              tickFormatter={timeFormatter}
              />
              <YAxis />
              <Tooltip labelFormatter={labelFormatter} />
          </LineChart>
          </ResponsiveContainer>
        </div>
    )
  }
}
