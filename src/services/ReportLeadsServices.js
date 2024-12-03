import axios from 'axios';

const GET_LEADS_URL = 'http://188.166.231.97:8080/api/v1/leads';
const UPDATE_LEADS_URL = 'http://188.166.231.97:8080/api/v1/leads/update';


// Fetch all leads
const getLeads = async () => {
  try {
    let token = sessionStorage.getItem("auth");
    const response = await axios.get(GET_LEADS_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

// // Fetch leads by id
// const getLeadsById = async (data) => {
//   try {
//     let token = sessionStorage.getItem("auth");
//     const response = await axios.post(GET_LEADS_BY_ID_URL, {
//       id: data.id},
//     {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching todos:', error);
//     throw error;
//   }
// };

// Update an existing todo
const updateLeads = async (id, updateLeads) => {
  try {
    let token = sessionStorage.getItem("auth");
    const response = await axios.post(UPDATE_LEADS_URL, {
      id: id,
      status: updateLeads
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    // Return the updated todo with the correct structure
    return response.data
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export { getLeads, updateLeads };