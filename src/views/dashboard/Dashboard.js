import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchDashboardThunk } from '../../redux/slices/dashboardSlice';
import MainChart from '../../components/dashboard/MainChart';

export default function Dashboard() {
  const dispatch = useDispatch();
  const {items: dashboard} = useSelector(state => state.dashboard);
  
  useEffect(() => {
    dispatch(fetchDashboardThunk());
  }, []);

  // const handleDashboard = async () => {
  //   dispatch(fetchDashboardThunk());
  // }

  return (
    <div>
      <MainChart analytics={dashboard}/>
    </div>
  )
}
