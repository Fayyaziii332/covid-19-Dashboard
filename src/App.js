import React from 'react';
import { Route, Link, Switch ,withRouter} from "react-router-dom";
import Graph from './components/graph';
import CountriesTable from './components/table';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {loadError,loadedCountriesRecord, dataLoading} from './actions/action';
import "./App.css";
import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  InfoCircleOutlined,
  WindowsOutlined,

} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;


class App extends React.Component {


  state = {
    collapsed: false,
    selected:this.props.location.pathname
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  manageSelected= e => {
    this.setState({selected: e.key})
  }

  componentDidMount() {
    const {fetchCountries} = this.props;
    fetchCountries();
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>


          <div className="log" style={{height:"280px"}} >
                 <img src="black.jpg" alt="" style={{margin:this.state.collapsed? "11%" : "13%", borderRadius:"35px",width:"70%",height:this.state.collapsed?"20%":"150px"}} />
                 <h2 hidden ={this.state.collapsed}  style={{color:"white",textAlign:"center", letterSpacing:2}} >COVID-19 App</h2>
                 <h3 hidden ={!this.state.collapsed}  style={{color:"white",textAlign:"center", letterSpacing:2}} >C-19 App</h3>
          </div>

          <hr/>

          <Menu theme="dark" defaultSelectedKeys={this.state.selected} onClick={this.manageSelected} style={{ letterSpacing:1,   marginTop: '25px' }}  mode="inline">
           
           
            <Menu.Item key="/"  icon={<PieChartOutlined />}>
            <Link  to="/"> Global Report </Link>
            </Menu.Item>
            <Menu.Item key="/countries" icon={<InfoCircleOutlined />}>
            <Link  to="/countries">Countries Info</Link>
            </Menu.Item>


          </Menu>

        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} >
              <h1 style={{marginLeft:"20px",fontSize:"2em", padding: 0,letterSpacing:5 }} ><WindowsOutlined style={{marginRight:"10px"}} />COVID-19 DASHBOARD</h1>
          </Header>
   
          <Content style={{ margin: '25px 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Switch>
                <Route exact  path="/" component={Graph} />
                <Route exact  path="/countries" component={CountriesTable} />
                <Route render={() => <h3 style={{color:"red",margin:"25px"}}>No Such Component Exists</h3>} />
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>WANCLOUDS ASSESMENT TASK ©2018 Created by FAYYAZ SHAH</Footer>
        </Layout>
      </Layout>
    );
  }
}

function fetchCountries() {
  return dispatch => {
    dispatch(dataLoading());
    fetch('https://disease.sh/v3/covid-19/countries')
      .then(res => res.json())
      .then(data=> {   
          dispatch(loadedCountriesRecord(data));
          return data;
      })
      .catch(error => {
          dispatch(loadError(error));
      })
  }
}

const mapDispatchToProps = dispatch =>  bindActionCreators({
  fetchCountries : fetchCountries
}, dispatch)


export default withRouter(connect(null,mapDispatchToProps)(App));