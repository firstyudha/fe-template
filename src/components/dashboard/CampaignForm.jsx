import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CFormInput } from '@coreui/react';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import Editor from 'react-simple-wysiwyg';

export default function CampaignForm({ addCampaign }) {
  const [newProduct, setNewProduct] = useState([]);
  const [fileName, setFileName] = useState("");
  const [selectedCat, setSelectedCat] = useState("Car");

  const handleInputChange = (e) => {
    e.preventDefault();
    addCampaign(newProduct);
    setNewProduct([]);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
        setFileName(e.target.files[0].name);
    }
  };

  const handleSelectChange = (e) => {
       setSelectedCat(e.target.value);
  };

  return (
      <form className='p-0' onSubmit={handleInputChange}>

        <CFormInput className="mb-3" controlId="exampleForm.ControlInput1"
          type="text"
          placeholder="Category"
          name="category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}></CFormInput>
    
        <CFormInput className="mb-3" controlId="exampleForm.ControlInput1"
          type="text"
          placeholder="Product Desc"
          name="product_desc"
          value={newProduct.product_desc}
          onChange={(e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}></CFormInput>
        <CFormInput className="mb-3" controlId="exampleForm.ControlInput1"
          type="number"
          placeholder="Product Price"
          name="product_price"
          value={newProduct.product_price}
          onChange={(e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}></CFormInput>
        <CFormInput className="mb-3" controlId="exampleForm.ControlInput1"
           type="text"
           placeholder="Campaign Name"
           name="campaign_name"
           value={newProduct.campaign_name}
           onChange={(e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}></CFormInput>
        <Editor
            placeholder="Campaign Desc"
            name="campaign_desc"
            value={newProduct.campaign_desc}
            onChange={(e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value })}/>
        
        <CFormInput className="mb-3" controlId="exampleForm.ControlInput1"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="contained-button-file"
            name="file"
            onChange={handleFileChange}></CFormInput>
        

        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload Image
          </Button>
        </label>
        {fileName && (
            <div style={{ marginTop: 20 }}>
                <p>Selected File: {fileName}</p>
            </div>
        )}
        
        <CButton color="primary" type="submit"> Add Campaign</CButton>
      </form>
  );
}

