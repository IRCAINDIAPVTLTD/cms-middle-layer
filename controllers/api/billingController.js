const axios = require('axios');
const pushToURL = require("../../helpers/pushHelper");
const Club = require("../../models/Club");


const formatDate = (date) => {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${mm}-${dd}-${yyyy}`;
};

const groupByBillNumber = (bills) => {
  return bills.reduce((acc, bill) => {
    if (!acc[bill.BillNumber]) {
      acc[bill.BillNumber] = {
        BillNumber: bill.BillNumber,
        BillDate: bill.BillDate,
        TotalAmount: 0,
        Items: [],
      };
    }

    acc[bill.BillNumber].Items.push({
      ItemCode: bill.ItemCode,
      ItemName: bill.ItemName,
      Quantity: bill.Quantity,
      Rate: bill.Rate,
      BillAmount: bill.BillAmount,
      Tax: bill.Tax,
      Amount: bill.Amount,
    });

    acc[bill.BillNumber].TotalAmount += parseFloat(bill.Amount);

    return acc;
  }, {});
};

exports.getMemberReceipt = async (req, res) => {
  try {
    const { membership_no, month, year } = req.body;

    if (!membership_no || !month || !year) {
      return res.status(400).json({ message: 'membership_no/month/year is required' });
    }

    const firstDate = new Date(year, month - 1, 1);
    const lastDate = new Date(year, month, 0);

    const formattedFirstDate = formatDate(firstDate); // MM-DD-YYYY
    const formattedLastDate = formatDate(lastDate);   // MM-DD-YYYY

    const url = `${process.env.BASE_URL}/api/member/ReceiptDetails/${membership_no}/${formattedFirstDate}/${formattedLastDate}`;
    const response = await pushToURL(url, {}, "GET");
    
    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch receipt from external service',
      });
    }

    res.json({
      success: true,
      member: response.data || {},
    });

  } catch (err) {
    console.error('Error fetching member receipt:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch receipt',
    });
  }
};

exports.getMemberBill = async (req, res) => {
  try {
    const { membership_no, month, year } = req.body;

    if (!membership_no || !month || !year) {
      return res.status(400).json({ message: 'membership_no/month/year is required' });
    }

    const url = `${process.env.BASE_URL}/api/member/BillDetails/${membership_no}/${month}/${year}/MEM`;
    const response = await pushToURL(url, {}, "GET");
    
    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch bill from external service',
      });
    }

    const allBills = response.data;

    if (!allBills || allBills.length === 0) {
      return res.status(404).json({ success: false, message: "No Bills found" });
    }

    const groupedBillsObject = groupByBillNumber(allBills);

    const groupedBills = Object.values(groupedBillsObject);

    res.status(200).json({ success: true, bills: groupedBills });

  } catch (err) {
    console.error('Error fetching member bill:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch bill',
    });
  }
};
