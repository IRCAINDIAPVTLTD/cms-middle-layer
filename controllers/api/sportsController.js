import axios from 'axios';
import pushToURL from '../../helpers/pushHelper.js';
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
