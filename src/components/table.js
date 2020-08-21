
import React from 'react';
import { connect } from 'react-redux';
import { Table, Input, Button, Space,Spin } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";



class CountriesTable extends React.Component {



       
    state = {
      searchText: "",
      searchedColumn: "",
      sortedInfo: null,
      sortCol:"none"
    };


  clearSort = () => {
    this.setState({
      sortedInfo: null,
    });
  };

  setSort = (e) => {
 
    this.setState({
      sortCol:e.target.value,
      sortedInfo: {
        order: 'descend',
        columnKey: e.target.value,
      },
    });
  };
  handleTableChange = (pagination, name, sorter) => {

    this.setState({
      sortCol:sorter.field,
      sortedInfo: sorter,
    });
  };

  

  
    getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={(node) => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() =>
              this.handleSearch(selectedKeys, confirm, dataIndex)
            }
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => this.handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => this.searchInput.select(), 100);
        }
      },
      render: (text) =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        )
    });
  
    handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex
      });
    };
  
    handleReset = (clearFilters) => {
      clearFilters();
      this.setState({ searchText: "" });
    };
  
    render() {
      const {loading , countries_record, error} = this.props;
      let {sortedInfo} = this.state;
       sortedInfo = sortedInfo || {};
      const columns = [
        {
          title: "Country Name",
          dataIndex: "country",
          key: "country",
          width: "20%",
          
          ...this.getColumnSearchProps("country"),
        },
        {
          title: "Population",
          dataIndex: "population",
          key: "population",
     
        },
        {
          title: "Cases",
          dataIndex: "cases",
          key: "cases",
    
        
        },
        {
          title: "Active",
          dataIndex: "active",
          key: "active",
          sorter: (a, b) => a.active - b.active,
          sortOrder: sortedInfo.columnKey === 'active' && sortedInfo.order,
          ellipsis: true,
        }
        ,
        {
          title: "Deaths",
          dataIndex: "deaths",
          key: "deaths",
          sorter: (a, b) => a.deaths - b.deaths,
          sortOrder: sortedInfo.columnKey === 'deaths' && sortedInfo.order,
          ellipsis: true,
        },
        {
          title: "Recovered",
          dataIndex: "recovered",
          key: "recovered",
          sorter: (a, b) => a.recovered - b.recovered,
          sortOrder: sortedInfo.columnKey === 'recovered' && sortedInfo.order,
          ellipsis: true,
        },
        {
          title: "Critical",
          dataIndex: "critical",
          key: "critical",
        }
      ];
    return(!loading || countries_record[5]) ? (error) ? (<h3 style={{color:"red",margin:"25px"}}>{error}</h3>) :
      (<div>
         <h2 style={{display:"block",fontSize:'2em'}}>Table For Countries Info</h2>
         <p style={{display:"inline-block",marginTop:"2%" ,marginRight:"1%",}} >Sort by:</p>

         <select value={this.state.sortCol} onChange={this.setSort} style={{ color:"gray",width:"15%",margin:"1% 2% 1% 1%" }} >           
            <option value="active">Active</option>
            <option value="deaths">Deaths</option>
            <option value="recovered">Recovered</option> 
            <option value="none">None</option>                    
         </select>
         
         <Table rowKey="country" columns={columns} onChange={this.handleTableChange} dataSource={countries_record} style={{width:"95%",margin:"0% 1% 2% 0"}} />

      </div> )   
      :(<div>
        <p>Loading.....</p>
        <Spin size="large" />
      </div>
       );
    }

}


const mapStateToProps = state => ({
  loading : state.countriesDataReducer.loading,
  countries_record : state.countriesDataReducer.countries_record,
  error: state.countriesDataReducer.error
})


export default connect(mapStateToProps)(CountriesTable);