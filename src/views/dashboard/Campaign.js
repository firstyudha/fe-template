import React, { useEffect } from 'react'
import { fetchCampaignThunk, addCampaignThunk } from '../../redux/slices/campaignSlice'
import { useDispatch, useSelector } from 'react-redux';
import CampaignForm from '../../components/dashboard/CampaignForm';
import CampaignList from '../../components/dashboard/CampaignList';

export default function Campaign() {
  const dispatch = useDispatch();
  const {items: campaigns} = useSelector(state => state.campaigns);
  
  useEffect(() => {
    dispatch(fetchCampaignThunk());
  }, []);

  const handleAddCampaign = async (data) => {
    dispatch(addCampaignThunk(data));
  }

  return (
    <>
      <CampaignList campaigns={campaigns}/>
      <CampaignForm addCampaign={handleAddCampaign} />
    </>
  )
}
