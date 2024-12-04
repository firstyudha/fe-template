import React from 'react'

import {
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

export default function CampaignList({campaigns}) {

return (
          <CRow>
            <CCol xs>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Category</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Campaign Name</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Campaign Desc</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Product Image</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Product Price</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {campaigns.map((campaign) => {
                    const desc = campaign.campaign_desc
                    return(
                    <CTableRow v-for="item in tableItems" key={campaign.campaign_id}>
                      <CTableDataCell className="text-center"></CTableDataCell>
                      <CTableDataCell>
                        <div>{campaign.category}</div>
                        <div className="small text-body-secondary text-nowrap"></div>
                      </CTableDataCell>

                      <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                          <div className="fw-semibold">{campaign.campaign_name}</div>
                        </div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                        <div className="d-flex justify-content-between text-nowrap">
                          <div dangerouslySetInnerHTML={{__html: desc}}></div>
                        </div>
                      </CTableDataCell>
                      
                      <CTableDataCell>
                        <div className="d-flex justify-content-between text-nowrap">
                          <img height={100} width={100} src={campaign.product_image}/>
                        </div>
                      </CTableDataCell>

                      <CTableDataCell className="text-center">
                      <div className="d-flex justify-content-between text-nowrap">
                      <div className="fw-semibold">Rp{campaign.product_price}</div>
                      </div>
                      </CTableDataCell>
                    </CTableRow>
                  )}
                  )}
                </CTableBody>
              </CTable>
            </CCol>
          </CRow>
    )
}