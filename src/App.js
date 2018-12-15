import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import './App.css';
import 'moment-timezone';
import moment from 'moment';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TempChart />
      </div>
    );
  }
}

class TempChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels : [],
      outdoorTempareture: [],
      indoorTempareture:[],
      indoorPressure: [],
      indoorHumidity: [],
      espeasyPm25: [],
      espeasyPm10: [],
    };
  }

  updateData(fetchedLabels, fetchedValues) {
    this.setState({
      data: {
        labels: fetchedLabels,
        datasets: [{
          label: "Przemek",
          borderColor: 'rgb(255, 99, 132)',
          data: fetchedValues,
        }]
      }
    });
  }

  updateLabels(globalArray) {
    let dates = globalArray
    .map(ga => ga.date)
    .map(da => moment(da).tz('Europe/Warsaw').format('lll'));

    this.setState({
        labels: dates,
    });

    return globalArray;
  }

  updateOutdoorTemperature(globalArray) {
    let values = globalArray
    .map(ga => parseFloat(ga.value));

    console.log(values);

    this.setState({
          outdoorTempareture: values
    });
  }


  updateIndoorTemperature(globalArray) {
    let values = globalArray
    .map(ga => parseFloat(ga.value));

    console.log(values);

    this.setState({
          indoorTempareture: values
    });
  }


  updateIndoorPressure(globalArray) {
    let values = globalArray
    .map(ga => parseFloat(ga.value));

    console.log(values);

    this.setState({
          indoorPressure: values
    });
  }

  updateIndoorHumidity(globalArray) {
    let values = globalArray
    .map(ga => parseFloat(ga.value));

    console.log(values);

    this.setState({
          indoorHumidity: values
    });
  }

  updateEspeasyPm25(globalArray) {
    let values = globalArray
    .map(ga => parseFloat(ga.value));

    console.log(values);

    this.setState({
      espeasyPm25: values
    });
  }

  updateEspeasyPm10(globalArray) {
    let values = globalArray
    .map(ga => parseFloat(ga.value));

    console.log(values);

    this.setState({
      espeasyPm10: values
    });
  }

  fetchValues(){
    fetch('http://192.168.1.24:8080/outdoor-temperature?sort=date,desc&size=300')
      .then(response => response.json())
      .then(fetched => this.updateLabels(fetched._embedded["outdoor-temperature"]))
      .then(globalArray => this.updateOutdoorTemperature(globalArray));

      fetch('http://192.168.1.24:8080/indoor2-temperature?sort=date,desc&size=300')
      .then(response => response.json())
      .then(fetched => this.updateIndoorTemperature(fetched._embedded["indoor2-temperature"]));
      
      fetch('http://192.168.1.24:8080/indoor2-pressure?sort=date,desc&size=300')
      .then(response => response.json())
      .then(fetched => this.updateIndoorPressure(fetched._embedded["indoor2-pressure"]));
            
      fetch('http://192.168.1.24:8080/indoor1-humidity?sort=date,desc&size=300')
      .then(response => response.json())
      .then(fetched => this.updateIndoorHumidity(fetched._embedded["indoor1-humidity"]));

      fetch('http://192.168.1.24:8080/espeasy-PM2_5?sort=date,desc&size=300')
      .then(response => response.json())
      .then(fetched => this.updateEspeasyPm25(fetched._embedded["espeasy-PM2_5"]));

      fetch('http://192.168.1.24:8080/espeasy-PM10?sort=date,desc&size=300')
      .then(response => response.json())
      .then(fetched => this.updateEspeasyPm10(fetched._embedded["espeasy-PM10"]));
  }

  componentDidMount() {
    this.fetchValues();
  }

  render() {
    let dataObject = {
      labels: this.state.labels,
      datasets: [{
        label: "Outdoor temperature",
        // backgroundColor: 'rgb(72, 208, 14)',
        borderColor: 'rgb(72, 208, 14)',
        data: this.state.outdoorTempareture,
      },
      {
        label: "Indoor temperature",
        // backgroundColor: 'rgb(255, 171, 0)',
        borderColor: 'rgb(255, 171, 0)',
        data: this.state.indoorTempareture,
      },
      {
        label: "Indoor pressure",
        // backgroundColor: 'rgb(255, 171, 0)',
        borderColor: 'rgb(180, 18, 198)',
        data: this.state.indoorPressure,
        hidden: true,
      },
      {
        label: "Indoor humidity",
        // backgroundColor: 'rgb(255, 171, 0)',
        borderColor: 'rgb(23, 230, 168)',
        data: this.state.indoorHumidity,
        hidden: true,
      },
      {
        label: "PM 2,5",
        // backgroundColor: 'rgb(255, 171, 0)',
        borderColor: 'rgb(247, 81, 81)',
        data: this.state.espeasyPm25,
      },
      {
        label: "PM 10",
        // backgroundColor: 'rgb(255, 171, 0)',
        borderColor: 'rgb(145, 49, 49)',
        data: this.state.espeasyPm10,
      }
    ]
    };
    
    let optionsObject = {
      maintainAspectRatio: false,
    };

    return (
      <div>
        <Line
          data={dataObject}
          options={optionsObject}
          height={650}
        />
      </div>
    );
  }
}

export default App;
