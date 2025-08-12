import pushToURL from '../../helpers/pushHelper.js';

export const setPaymentTransaction = async (req, res) => {
  
  try {

    const {
      membership_no,
      transaction_id,
      amount,
      payment_metadata,
    } = req.body;

    if (!membership_no || !transaction_id || !amount || !payment_metadata) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: membership_no, transaction_id, payment data, or amount'
        });
    }
      
    const url = `${process.env.BASE_URL}/api/member/getSignkeyV2_ccavaenuewebsite/11/${transaction_id}/${amount}/${membership_no}`;
    const response = await pushToURL(url, {}, "POST");

    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to save payment transaction details',
      });
    }


    res.json({
      success: true,
      payment_details: response.data,
    });

  } catch (err) {
    console.error('Error fetching sports departments:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sports department details',
    });
  }
};


export const confirmPayment = async (req, res) => {
  
  try {

    const {
      membership_no,
      transaction_id,
      amount,
      payment_refno,
      payment_metadata,
    } = req.body;

    if (!membership_no || !transaction_id || !amount || !payment_metadata || !payment_refno) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: membership_no, transaction_id, payment data, or amount'
        });
    }
      
    const url = `${process.env.BASE_URL}/api/member/CreditToMemberWebsite/1/${amount}/${membership_no}/${transaction_id}/Success/${payment_refno}/null`;
    console.log('Confirming payment with URL:', url);
    const response = await pushToURL(url, {}, "POST");

    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to confirm payment transaction',
      });
    }


    res.json({
      success: true,
      payment_details: response.data,
    });

  } catch (err) {
    console.error('Error confirm payment transaction:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to confirm payment transaction',
    });
  }
};
