import { useEffect, useState } from 'react';
import './App.css'
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import FormTable from './component/FormTable';

axios.defaults.baseURL = "http://localhost:8000/"

function App() {

  const [addSection, setAddSection] = useState(false);
  

  const[formData, setFormData] = useState({
    name:"",
    email:"",
    mobile:"",
  })


  //edite form section
  const[formDataEdite, setFormDataEdite] = useState({
    name:"",
    email:"",
    mobile:"",
    _id:""
  })

  //table
  const [dataList, setDataList] = useState([]);
  //edite
  const [editeSection, setEditeSection] = useState(false)
  
  const handleOnChange = (e) =>{
    const {value,name} = e.target
    setFormData((preve) =>{
      return{
        ...preve,
        [name]: value
      }
    })
  }


//data create panna
  const handleSubmit = async (e) =>{
    e.preventDefault()
    const data = await axios.post( "/create", formData )
    console.log(data)
    if (data.data.succcess) {
      setAddSection(false)
      alert(data.data.message)
      getFetchData()
    }
  }

//table la kondu vara
  const getFetchData = async() =>{
    const data = await axios.get( "/" )
    // console.log(data)
    if (data.data.succcess) {
      setDataList(data.data.data)
    }
  }
  useEffect(()=>{
      getFetchData()
  },[])


// data delete
  const handleDelete  = async(id) =>{
      const data = await axios.delete("/delete/" + id)
      if (data.data.succcess) {
        getFetchData()
        alert(data.data.message)

      }
  }

  // data update part
  const handleUpdate = async(e) =>{
      e.preventDefault()
      const data = await axios.put("/update",formDataEdite)
      if (data.data.succcess) {
        getFetchData()
        alert(data.data.message)

      }
  }

  //edite part kku
  const handleEditeOnChange = async (e)=>{
    const {value,name} = e.target
    setFormDataEdite((preve) =>{
      return{
        ...preve,
        [name]: value
      }
    })
  }

  const handleEdite = (el) =>{
    setFormDataEdite(el)
    setEditeSection(true)
    
  }

  
  return (
    <>
      <div className='container'>
        <button className='btn btn-add' onClick={()=>setAddSection(true)}> add</button>

        {
          addSection &&(
            <FormTable
              handleOnChange={handleOnChange}
              handleSubmit={handleSubmit}
              handleclose={() => setAddSection(false)}
              rest={formData}
            />
          )
        }
        {
          editeSection &&(
            <FormTable
            handleOnChange={handleEditeOnChange}
            handleSubmit={handleUpdate}
            handleclose={() => setEditeSection(false)}
            rest={formDataEdite}
          />
          )
        }

        <div className='tableContainer'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              { dataList[0] ?(
                dataList.map((el) => {
                  console.log(el)
                  return(
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.mobile}</td>
                      <td>
                        <button className='btn btn-edite' onClick={() => handleEdite(el)}>Edit</button>
                        <button className='btn btn-delete' onClick={() =>handleDelete(el._id)}>Delete</button>
                      </td>
                    </tr>
                  )
                }))
                :(
                  <p>No data</p>
                )
              }
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default App
