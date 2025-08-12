import axios from 'axios';
import pushToURL from '../../helpers/pushHelper.js';
import sportsHelper from '../../helpers/sportsHelper.js';
import Club from "../../models/Club.js";

export const getSportsDepartment = async (req, res) => {
  try {
    const url = `${process.env.BASE_URL}/api/sports/SportsDetails`;
    const response = await pushToURL(url, {}, "GET");

    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch sports department details',
      });
    }

    // Group by DeptName
    const groupedData = response.data.reduce((acc, item) => {
      const deptName = item.DeptName;
      if (!acc[deptName]) {
        acc[deptName] = [];
      }
      acc[deptName].push(item);
      return acc;
    }, {});

    res.json({
      success: true,
      departments: groupedData,
    });

  } catch (err) {
    console.error('Error fetching sports departments:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sports department details',
    });
  }
};


export const saveSportsBill = async (req, res) => {

  try {

    const {
      membership_no,
      member_name,
      transaction_date,
      remarks,
      payment_mode,
      sports_id,
      ref_no,
      amount
    } = req.body;

    if (
      !membership_no ||
      !member_name ||
      !transaction_date ||
      !payment_mode ||
      !sports_id ||
      !amount
    ) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(transaction_date) || isNaN(new Date(transaction_date).getTime())) {
      return res.status(400).json({ error: "Invalid transaction_date" });
    }

    if (payment_mode !== "online" && payment_mode !== "") {
      return res.status(400).json({ error: "Invalid payment_mode" });
    }

    if (payment_mode === "online" && (!ref_no || ref_no.trim() === "")) {
      return res.status(400).json({ error: "ref_no required for online payment" });
    }

    if (payment_mode === "" && ref_no !== "") {
      return res.status(400).json({ error: "ref_no must be empty if payment_mode is empty" });
    }

    const url = `${process.env.BASE_URL}/api/sports/SportsDetails`;
    const sportsResponse = await pushToURL(url, {}, "GET");

    if (!sportsResponse.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to save sports bill details',
      });
    }

    if (!Array.isArray(sportsResponse.data)) {
      return res.status(500).json({ error: "Invalid sports details response" });
    }

    const matchedSports = sportsResponse.data.filter(
      (sport) => String(sport.DepartmentID) === String(sports_id)
    );

    if (matchedSports.length === 0) {
      return res.status(400).json({ error: "Invalid sports_id - no match found" });
    }

    const data = {
      membership_no,
      memberName: member_name,
      booking_date: transaction_date,
      remarks: remarks || "Sports Booking",
      payment_mode,
      ref_no: ref_no || "",
      slot_fee: amount,
      department_name: matchedSports[0].DeptName,
      metadata_tax: {
        LedgerID: matchedSports[0].LedgerID,
        taxes: [
          { TaxLedgerID: matchedSports[0].TaxLedgerID, TaxValue: matchedSports[0].TaxValue },
          { TaxLedgerID: matchedSports[1].TaxLedgerID, TaxValue: matchedSports[1].TaxValue }
        ]
      }
    };

    const payload = await sportsHelper(data);


    const urlSave = `${process.env.BASE_URL}/api/sports/SaveSportsBookDetails`;
    const responseBill = await pushToURL(urlSave, payload, "POST");

    if (!responseBill.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to save sports bill details',
      });
    }

    res.json({
      success: true,
      message: 'Sports bill saved successfully',
      data: responseBill.data
    });

  } catch (err) {
    console.error('Error saving sports bill:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to save sports bill',
    });
  }
};
