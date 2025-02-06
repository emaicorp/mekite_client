import axios from 'axios';

const calculateDailyProfit = async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}profit/distribute`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          // Add any required authentication headers
          'Authorization': `Bearer ${process.env.CRON_SECRET_KEY}`
        }
      }
    );

    if (response.data.success) {
      console.log('Daily profit calculated successfully:', response.data);
      return { success: true, message: 'Profit calculated successfully' };
    }
  } catch (error) {
    console.error('Error calculating daily profit:', error);
    return { success: false, message: error.message };
  }
};

export default calculateDailyProfit; 