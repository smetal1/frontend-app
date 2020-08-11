import React,{useState,useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import Bootstraptable from 'react-bootstrap-table-next';
import pagination from 'react-bootstrap-table2-paginator';
import * as ReactBootstrap from 'react-bootstrap'

function App() {

  const [city,setCity]=useState([]);
  const [loading,setLoading]=useState(false);
  const getCity=async()=>{
    try {
      var config = {
        headers: {'Access-Control-Allow-Origin': '*'}
    };
      const data = await Axios.get("http://localhost:3001",config);
      setCity(data.data)
      setLoading(true)
    }catch(e){
      console.log("ERROR-",e)
    }
  }
  const columns =[
    {dataField: "ID", text: "Index"},
    {dataField: "Name", text: "Name"},
    {dataField: "CountryCode", text: "Country Code"},
    {dataField: "District", text: "District"},
    {dataField: "Population", text: "Population"}
  ]

  useEffect(()=>{
    getCity()
  },[])
  return (
    <div className="App">
      {loading ? (
         <Bootstraptable
         keyField="ID"
         data= {city}
         columns={columns}
         pagination={pagination()}
         />
      ): (<ReactBootstrap.Spinner animaton="border"></ReactBootstrap.Spinner>)}
    
    </div>
  );
}

export default App;
