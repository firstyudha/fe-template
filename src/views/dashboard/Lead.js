import React, { useState, useEffect } from 'react'
import { getLeads, updateLeads } from '../../services/ReportLeadsServices';

import {
  CAvatar,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'


// Popup Component
const Popup = ({ status, onStatusChange, onClose, onSubmit }) => {
  const [leads, setLeads] = useState(null)
  return (
    <div className="bg-body-tertiary text-center"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        padding: "20px",
        backgroundColor: "black",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
      }}
    >
      <h3>Change Followed Up Status : </h3>
      <label htmlFor="status-dropdown"></label>
      <select
        id="status-dropdown"
        value={status}
        onChange={onStatusChange}
        style={{ margin: "10px 0", padding: "5px" }}
      >
        <option value="NEW">New</option>
        <option value="APV">Interested</option>
        <option value="RJC">Not Interested</option>
        <option value="FLW">Follow-up</option>
      </select>
      <div className="ms-1">
        <button type="button" className="btn btn-danger rounded-pill" onClick={onClose}>Cancel</button>
        <button type="button" className="btn btn-success rounded-pill" onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};

const Lead = () => {


  const [showPopup, setShowPopup] = useState(false);
  const [status, setStatus] = useState("");

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState([]);
  const [id, setId] = useState(null);
  console.log('id : ', id)

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const fetchTodos = async () => {
    try {
      const data = await getLeads();
      setTodos(data.data);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSubmit = async () => {
    // setStatus(status)
    // console.log(status)
    if (id && status) {
      const result = await updateLeads(id, status)
      if (result.code == 200) {
        await fetchTodos()
        setShowPopup(!showPopup);
        return
      }
      alert('error')
    } else {
      alert ('id tidak ditemukan')
    }
  }

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {

    fetchTodos();
  }, []);

  useEffect(() => {
  }, [todos]);

  return (
    <>
      <CRow>
        <CCol xs>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  Name
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  Phone Number
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Address</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Category</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Campaign Name</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Product Image</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Product Desc</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Product Price</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Status</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Follow Up</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {todos.map((item, index) => (
                <CTableRow v-for="item in tableItems" key={item.campaign_id + index}>
                  <CTableDataCell className="text-center">
                    {item.name}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {item.email}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {item.phone_number}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {item.address}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {item.category}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {item.campaign_name}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    <img className="d-block w-100" src={item.product_image} alt="slide 1" />
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {item.product_desc}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {item.product_price}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {item.status}
                  </CTableDataCell>

                  <CTableDataCell>
                    <div className="fw-semibold text-nowrap"><button onClick={() => {
                      setId(item.leads_id)
                      togglePopup()
                    }}>Update</button></div>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCol>
      </CRow>
      {/* Render Popup Component */}
      {showPopup && (
        <Popup
          status={status}
          onStatusChange={handleStatusChange}
          onClose={() => {
            setId(null)
            togglePopup()
          }
          }
          onSubmit={() => toggleSubmit()}
        />
      )}
    </>
  )
}

export default Lead
