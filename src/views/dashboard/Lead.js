import React,  { useState, useEffect } from 'react'
import {getTodos, deleteTodo, updateTodo, createTodo } from '../../services/ReportLeadsServices';

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
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cilPeople,
} from '@coreui/icons'


// Popup Component
const Popup = ({ status, onStatusChange, onClose, onSubmit }) => {
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
      <h3>Change Status</h3>
      <label htmlFor="status-dropdown">Select Status:</label>
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
      <p>Current Status: {status}</p>
      <div class="ms-1">
      <button type="button" class="btn btn-danger rounded-pill" onClick={onClose}>Cancel</button>
      <button type="button" class="btn btn-success rounded-pill" onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
};

const Lead = () => {


  const [showPopup, setShowPopup] = useState(false);
  const [status, setStatus] = useState("Pending");

  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState([]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleSubmit = () => {
    setStatus(status)
    console.log(status)
    
    setShowPopup(!showPopup);
  }

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data.data);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      } finally {
        setLoading(false);
      }
    };
  
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
                <CTableRow v-for="item in tableItems" key={item.campaign_id+index}>
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
                    <div className="fw-semibold text-nowrap"><button onClick={togglePopup}>Update</button></div>
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
          onClose={togglePopup}
          onSubmit={toggleSubmit}
        />
      )}
    </>
  )
}

export default Lead
