import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const router = express.Router();

// Initialize Razorpay instance with fallback values for testing
const razorpayKeyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_RFA4WduzM8QkXb';
const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || 'EaZ8B3YryVmGg1OKHFyrlv7L';

const razorpay = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

// Create Razorpay order
router.post('/create-order', async (req, res) => {
  try {
    const { amount, fundName, userDetails } = req.body;

    if (!amount || amount < 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount. Minimum amount is ₹100'
      });
    }

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `rcpt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      notes: {
        fund_name: fundName,
        user_email: userDetails?.email || '',
        user_name: userDetails?.name || '',
        investment_type: 'mutual_fund'
      }
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status
      }
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error: error.message
    });
  }
});

// Verify payment signature
router.post('/verify-payment', (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      amount,
      fundName 
    } = req.body;

    // Create signature for verification
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      // Payment is verified
      // Here you can save the transaction to database
      
      const transaction = {
        payment_id: razorpay_payment_id,
        order_id: razorpay_order_id,
        signature: razorpay_signature,
        amount: amount,
        fund_name: fundName,
        status: 'success',
        created_at: new Date()
      };

      // TODO: Save transaction to database
      console.log('Payment verified and transaction saved:', transaction);

      res.json({
        success: true,
        message: 'Payment verified successfully',
        transaction
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: error.message
    });
  }
});

// Get payment details
router.get('/payment/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    
    const payment = await razorpay.payments.fetch(paymentId);
    
    res.json({
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        method: payment.method,
        created_at: payment.created_at
      }
    });
  } catch (error) {
    console.error('Error fetching payment details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment details',
      error: error.message
    });
  }
});

export default router;