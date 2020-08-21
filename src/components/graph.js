
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loadError, loadedGloablRecord ,dataLoading} from '../actions/action';
import {LineChart,Line,XAxis,Tooltip,CartesianGrid} from "recharts";
import { Statistic, Card, Row, Col,Spin } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons'
import PieChart, {
    Legend,
    Series,
    Label,
    Font,
    Connector
  } from 'devextreme-react/pie-chart';
class Graph extends React.Component {


    componentDidMount() {
        const {fetchGlobal} = this.props;
        fetchGlobal();
    }
       
    
    render(){
       const {loading,global_record, countries_record,error} = this.props;
       const data =[ 
        {
            label: "Recovered",
            value: global_record.cases
        },
        {
            label: "Active",
            value: global_record.active
        },
        {
        label: "Deaths",
        value: global_record.deaths
        },]
        
        return(loading) ? 
        (<div>
            <p>Loading.....</p>
            <Spin size="large" />
        </div>) :  (error) ? (<h3 style={{color:"red",margin:"25px"}}>{error}</h3>) :
            (<div  style={{color:'black'}}> 
                <h1 className="pad" style={{fontSize:"2em", letterSpacing:3}}>Global Situation </h1>


                        <div className="site-statistic-demo-card">
                            <Row gutter={16}>
                                    <Col span={6}>
                                        <Card>
                                            <Statistic
                                                title="Total Cases"
                                                value={global_record.cases}
                                                valueStyle={{ color: 'orange' }}
                                                
                                                />
                                        </Card>
                                    </Col>
                                    <Col span={6}>
                                        <Card>
                                            <Statistic
                                                title="Total Recovered"
                                                value={global_record.recovered}
                                                valueStyle={{ color: '#3f8600' }}
                                                prefix={<ArrowUpOutlined />}
                                                suffix=""
                                                />
                                        </Card>
                                    </Col>
                                    <Col span={6}>
                                        <Card>
                                            <Statistic
                                                title="Total Deaths"
                                                value={global_record.deaths}
                                                valueStyle={{ color: '#cf1322' }}
                                                prefix={<ArrowDownOutlined />}
                                                suffix=""
                                            />
                                         </Card>
                                    </Col>
                                    <Col span={6}>
                                        <Card>
                                            <Statistic
                                                title="Critical Cases"
                                                value={global_record.critical} 
                                                valueStyle={{ color: '#e5ea35' }}
                                                prefix={<ArrowDownOutlined />}
                                                
                                            />
                                         </Card>
                                    </Col>
                                </Row>
                        </div>
               
                <div style={{marginTop:"3%"}}>
                <PieChart id="pie"
                        palette="Bright"
                        dataSource={data}
                        title="Statistical View"
                    >
                        <Legend
                        orientation="horizontal"
                        itemTextPosition="right"
                        horizontalAlignment="center"
                        verticalAlignment="bottom"
                        columnCount={4} />
                    
                        <Series argumentField="label" valueField="value">
                        <Label
                            visible={true}
                            position="columns"
                            customizeText={customizeText}>
                            <Font size={16} />
                            <Connector visible={true} width={0.5} />
                        </Label>
                        </Series>
                 </PieChart>
                </div>

                
                <div   style={{marginTop:"5%"}}>
        <h1  style={{fontSize:"1.5em",paddingLeft:"5px", letterSpacing:2}}>Stats for Countries Situation</h1>
                    <LineChart
                        width={1300}
                        height={400}
                        data={countries_record}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                      

                        >
                        <XAxis dataKey="country" />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line type="monotone" dataKey="deaths" stroke="red" yAxisId={0} />
                        <Line type="monotone" dataKey="cases" stroke="#387908" yAxisId={1} />
                    </LineChart>
              </div>
            </div>
        )
    }
  
}

function customizeText(arg) {
    return `${arg.valueText} (${arg.percentText})`;
}

function fetchGlobal() {
    return dispatch => {
        dispatch(dataLoading());
        fetch('https://disease.sh/v3/covid-19/all')
        .then(res => res.json())
        .then(data=> {
          // console.log(data)
            dispatch(loadedGloablRecord(data));
            return data;
        })
        .catch(error => {
            dispatch(loadError(error));
        })
    }
  }

const mapDispatchToProps = dispatch =>  bindActionCreators({
    fetchGlobal: fetchGlobal
}, dispatch)

const mapStateToProps = state => ({
  loading : state.globalDataReducer.loading,
  global_record : state.globalDataReducer.global_record,
  countries_record : state.countriesDataReducer.countries_record,
  error: state.globalDataReducer.error
})

  
export default connect(mapStateToProps, mapDispatchToProps)(Graph);
