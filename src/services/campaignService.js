import axios from 'axios';

const API_V2 = 'http://188.166.231.97:8080/api/v1';
const CAMPAIGN_GET = '/campaign';
const CAMPAIGN_ADD = '/campaign/create';

export const getListCampaign = async () => {
  try {
      let token = sessionStorage.getItem("auth");
      const response = await axios.get(API_V2+CAMPAIGN_GET, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching campaign:', error);
      throw error;
    }
}

export const addCampaign = async (campaign) => {
  // get file
  const myFile = document.querySelector("input[type=file]").files[0];
  // append to form
  const data = new FormData();
  data.append("file", myFile);
  data.append("category", campaign.category);
  data.append("campaign_name", campaign.campaign_name);
  data.append("campaign_desc", campaign.campaign_desc);
  data.append("product_desc", campaign.product_desc);
  data.append("product_price", campaign.product_price);

  let token = sessionStorage.getItem("auth");

  try {
    const response = await axios.post(`${API_V2+CAMPAIGN_ADD}`, data, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "multipart/form-data"
      },
      method: "POST"
    });
    
    // Transform the response to match our expected format
    return response.data;
  } catch (error) {
    console.error('Error creating campaign:', error.response?.data || error.message);
    throw error;
  }
};