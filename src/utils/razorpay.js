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

export const createRazorpayOrder = async (amount, fundName, userDetails) => {
  try {
    const response = await fetch('http://localhost:5000/api/payment/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        amount,
        fundName,
        userDetails
      })
    });

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to create payment order');
    }

    // Return order with key for frontend use
    return {
      ...data.order,
      key: data.key // Backend will provide the key
    };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    // Fallback to mock order for testing if server is not available
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return {
      id: orderId,
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `rcpt_${orderId}`,
      status: 'created'
    };
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