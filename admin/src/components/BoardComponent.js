import React from 'react';
import Loader from './loader';


export default class Board extends React.Component {
  
  componentDidMount() {
    $(document).ready(function() {
      // Javascript method's body can be found in admin/js/demos.js
      demo.initDashboardPageCharts();
    });
  }
   
    
  render() {
    
    //const { about } = this.props;
    
    //if (!about) {
    //  return <Loader/>
    //}
    
    return (
      <div>

      <div className="panel-header panel-header-lg">
        <canvas id="bigDashboardChart"></canvas>
      </div>
      <div className="content">
        <div className="row">
          <div className="col-lg-4">
            <div className="card card-chart">
              <div className="card-header">
                <h5 className="card-category">Global Sales</h5>
                <h4 className="card-title">Shipped Products</h4>
                <div className="dropdown">
                  <button type="button" className="btn btn-round btn-outline-default dropdown-toggle btn-simple btn-icon no-caret" data-toggle="dropdown">
                    <i className="now-ui-icons loader_gear"></i>
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                    <a className="dropdown-item text-danger" href="#">Remove Data</a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  <canvas id="lineChartExample"></canvas>
                </div>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69"></i> Just Updated
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card card-chart">
              <div className="card-header">
                <h5 className="card-category">2018 Sales</h5>
                <h4 className="card-title">All products</h4>
                <div className="dropdown">
                  <button type="button" className="btn btn-round btn-outline-default dropdown-toggle btn-simple btn-icon no-caret" data-toggle="dropdown">
                    <i className="now-ui-icons loader_gear"></i>
                  </button>
                  <div className="dropdown-menu dropdown-menu-right">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                    <a className="dropdown-item text-danger" href="#">Remove Data</a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  <canvas id="lineChartExampleWithNumbersAndGrid"></canvas>
                </div>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="now-ui-icons arrows-1_refresh-69"></i> Just Updated
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="card card-chart">
              <div className="card-header">
                <h5 className="card-category">Email Statistics</h5>
                <h4 className="card-title">24 Hours Performance</h4>
              </div>
              <div className="card-body">
                <div className="chart-area">
                  <canvas id="barChartSimpleGradientsNumbers"></canvas>
                </div>
              </div>
              <div className="card-footer">
                <div className="stats">
                  <i className="now-ui-icons ui-2_time-alarm"></i> Last 7 days
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
    )
  }
}
