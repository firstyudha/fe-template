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
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
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
        setTodos(data.slice(1,10));
        console.log("DATA NYA : ", data)
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTodos();
  }, []);

  useEffect(() => {
    //console.log('Todos state actually updated:', todos);
  }, [todos]);

  return (
    <>
      <CRow>
        <CCol xs>
          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Leads ID</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  Nama
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Email</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary text-center">
                  No HP
                </CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Alamat</CTableHeaderCell>
                <CTableHeaderCell className="bg-body-tertiary">Follow Up</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {todos.map((item) => (
                <CTableRow v-for="item in tableItems" key={item.id}>
                  <CTableDataCell className="text-center">
                  {item.userId}
                  </CTableDataCell>
                  <CTableDataCell>
                    <div>{item.id}</div>
                    <div className="small text-body-secondary text-nowrap">
                      {/* <span>{item.user.new ? 'New' : 'Recurring'}</span> | Registered:{' '}
                      {item.user.registered} */}
                    </div>
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {/* <CIcon size="xl" icon={item.country.flag} title={item.country.name} /> */}
                    {item.title}
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="d-flex justify-content-between text-nowrap">
                      {/* <div className="fw-semibold">{item.usage.value}%</div> */}
                      <div className="ms-3">
                        <small className="text-body-secondary">{item.completed ? "Yes" : "No"}</small>
                      </div>
                    </div>
                    {/* <CProgress thin color={item.usage.color} value={item.usage.value} /> */}
                  </CTableDataCell>
                  <CTableDataCell className="text-center">
                    {/* <CIcon size="xl" icon={item.payment.icon} /> */}
                  </CTableDataCell>
                  <CTableDataCell>
                    <div className="small text-body-secondary text-nowrap">Last login</div>
                    <div className="fw-semibold text-nowrap">{item.activity}</div>
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
