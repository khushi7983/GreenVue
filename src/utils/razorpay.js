// Razorpay configuration and utility functions
export const razorpayConfig = {
  // Key will be provided by backend in order response for security
  currency: 'INR',
  name: 'GreenVue',
  description: 'Green Mutual Fund Investment',
  image: '/logo.png', // Add your logo here
  theme: {
    color: '#10b981' // Green theme matching your app
  }
};

export const createRazorpayOrder = async (amount, fundName, fundSymbol, navPrice, userDetails = {}) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const units = (amount / navPrice).toFixed(4);

    const response = await fetch(buildApiUrl(API_ENDPOINTS.PAYMENT.CREATE_ORDER), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        amount,
        fundName,
        fundSymbol,
        navPrice,
        units: parseFloat(units),
        userDetails
      })
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to create payment order');
    }

    // Return order data from backend
    return {
      id: data.orderId,
      amount: data.amount,
      currency: data.currency,
      key: data.key,
      receipt: data.receipt
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    throw error; // Re-throw to handle in calling function
  }
};

// Verify payment on backend
export const verifyRazorpayPayment = async (paymentData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }

    const response = await fetch(buildApiUrl(API_ENDPOINTS.PAYMENT.VERIFY_PAYMENT), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },  
      body: JSON.stringify(paymentData)
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Payment verification failed');
    }

    return data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};