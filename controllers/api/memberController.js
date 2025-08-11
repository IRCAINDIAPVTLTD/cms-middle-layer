import axios from 'axios';
import pushToURL from '../../helpers/pushHelper.js';
import Club from "../../models/Club.js";
import Otp from "../../models/Otp.js";

export const getMemberOB = async (req, res) => {
  try {
    const { membership_no } = req.body;

    if (!membership_no) {
      return res.status(400).json({ message: 'membership_no is required' });
    }

    // Call external API to fetch profile
    const url = `${process.env.BASE_URL}/api/member/OB/${membership_no}`;
    const response = await pushToURL(url, {}, "GET");
    
    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch outstanding balance from external service',
      });
    }

    res.json({
      success: true,
      member: response.data || {},
    });

  } catch (err) {
    console.error('Error fetching member outstanding:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch outstanding balance',
    });
  }
};

export const getMemberSportsOB = async (req, res) => {
  try {
    const { membership_no } = req.body;

    if (!membership_no) {
      return res.status(400).json({ message: 'membership_no is required' });
    }

    // Call external API to fetch profile
    const url = `${process.env.BASE_URL}/api/member/sportsOB/${membership_no}`;
    const response = await pushToURL(url, {}, "GET");
    
    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch outstanding balance from external service',
      });
    }

    res.json({
      success: true,
      member: response.data || {},
    });

  } catch (err) {
    console.error('Error fetching member outstanding:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch outstanding balance',
    });
  }
};

export const getMemberCreditLimit = async (req, res) => {
  try {
    const { membership_no } = req.body;

    if (!membership_no) {
      return res.status(400).json({ message: 'membership_no is required' });
    }

    // Call external API to fetch profile
    const url = `${process.env.BASE_URL}/api/member/${membership_no}`;
    const response = await pushToURL(url, {}, "GET");
    
    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch profile from external service',
      });
    }

    limitCheck = response.data[0]?.IsCreditCheckRequired;

    if( limitCheck === 'True') {
      availableCredit = response.data[0]?.Creditlimit || 0;
      return res.json({
        success: true,
        message: 'Credit limit is enabled for this member',
        data: {
          status: true,
          availableCredit: availableCredit,
        }
      });
    }

    if( limitCheck === 'False') {
      availableCredit = 'Not Applicable';
      return res.json({
        success: true,
        message: 'Credit limit is false, so not applicable for this member and check is not required',
        data: {
          status: false,
          availableCredit: availableCredit,
        }
      });
    }

    res.json({
      success: false,
      message: 'Credit limit check is not enabled for this member',
    });

  } catch (err) {
    console.error('Error fetching member credit limit:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch credit limit',
    });
  }
};

export const getMemberProfile = async (req, res) => {
  try {
    const { membership_no } = req.body;

    if (!membership_no) {
      return res.status(400).json({ message: 'membership_no is required' });
    }

    // Call external API to fetch profile
    const url = `${process.env.BASE_URL}/api/member/${membership_no}`;
    const response = await pushToURL(url, {}, "GET");
    
    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch profile from external service',
      });
    }

    res.json({
      success: true,
      member: response.data[0] || {},
    });

  } catch (err) {
    console.error('Error fetching member profile:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
    });
  }
};

export const getMemberAuthV2 = async (req, res) => {
  try {
    const { membership_no, phone_no } = req.body;

    if (!membership_no || !phone_no) {
      return res.status(400).json({ message: 'membership_no/phone no. is required' });
    }

    // Call external API to fetch profile
    const url = `${process.env.BASE_URL}/api/member/${membership_no}`;
    const response = await pushToURL(url, {}, "GET");
    
    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch profile from external service',
      });
    }

    const member = response.data[0] || {};
    const mobile_number = 9620722486;//member.MobileNo?.trim();

    if (!mobile_number || mobile_number !== phone_no) {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid membership number or phone number',
      });
    }

    res.json({
      success: true,
      member: response.data[0] || {},
    });

  } catch (err) {
    console.error('Error fetching member profile:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
    });
  }
};

export const getMemberAuth = async (req, res) => {
  try {
    const { membership_no, password } = req.body;

    if (!membership_no || !password) {
      return res.status(400).json({ message: 'membership_no/password is required' });
    }

    // Call external API to fetch profile
    const url = `${process.env.BASE_URL}/api/member/Authenticate/${membership_no}/${password}/0`;
    const response = await pushToURL(url, {}, "GET");
    
    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch',
      });
    }

    if (response.data.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid membership number or password',
      });
    }

    res.json({
      success: true,
      member: response.data[0] || {},
    });

  } catch (err) {
    console.error('Error fetching member Credentials:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Invalid membership number or password',
    });
  }
};

export const getMemberDependant = async (req, res) => {
  try {
    const { membership_id } = req.body;

    if (!membership_id) {
      return res.status(400).json({ message: 'membership_id is required' });
    }

    // Call external API to fetch profile
    const url = `${process.env.BASE_URL}/api/member/Dependant/${membership_id}`;
    const response = await pushToURL(url, {}, "GET");
    
    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch',
      });
    }

    if (response.data.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid membership id',
      });
    }

    res.json({
      success: true,
      member: response.data || {},
    });

  } catch (err) {
    console.error('Error fetching membership id:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Invalid membership id',
    });
  }
};

export const getMemberOtp = async (req, res) => {
  try {
    const { membership_no } = req.body;

    if (!membership_no) {
      return res.status(400).json({ message: 'membership_no is required' });
    }

    const club_code = 'BAY'; // Assuming club_code is static for this example

    const club = await Club.findOne({ club_code });
      if (!club || !club.club_ip_address) {
          return res.status(404).json({ success: false, message: "Club not found" });
        }

    
    const club_sms_gateway = club.club_sms_gateway;
    const club_sms_template = club.club_sms_template;
    
    if (!club_sms_gateway || !club_sms_template) {  
      return res.status(400).json({ success: false, message: "SMS gateway or template not configured for this club" });
    }

    const threeMinutesAgo = new Date(Date.now() - 3 * 60000);
        const recentOtp = await Otp.findOne({
          membership_no,
          createdAt: { $gte: threeMinutesAgo },
          isExpired: false,
        });
    
        if (recentOtp) {
          return res.status(429).json({
            success: false,
            message: "OTP already sent. Please wait 3 minutes before requesting a new one.",
          });
        }

    // Call external API to fetch profile
    const url = `${process.env.BASE_URL}/api/member/${membership_no}`;
    const response = await pushToURL(url, {}, "GET");

    const memberData = response.data;
    if (!Array.isArray(memberData) || memberData.length === 0) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }

    const member = memberData[0];
    const mobile_number = member.MobileNo?.trim();
    
    if (!mobile_number) {
      return res.status(400).json({ success: false, message: "Mobile number not found for member" });
    }

    // Generate random 5-digit OTP
    const otp = Math.floor(10000 + Math.random() * 90000).toString();

        // Save OTP to database
        await Otp.create({
          membership_no,
          mobile_number,
          club_code,
          otp,
          isExpired: false,
          expiresAt: new Date(Date.now() + 5 * 60000), // valid for 5 mins
        });
    
        // Send OTP via SMS using the configured SMS gateway and template
        const message = club_sms_template.replace("{{otp_code}}", otp);
        const MobileNumber = '9620722486';
    
        const smsGatewayUrl = club_sms_gateway.replace("{mobile}", MobileNumber).replace("{msg}", message);
    
        const postResult = await pushToURL(smsGatewayUrl, {}, "get");
        console.log(postResult);
    
        return res.status(200).json({
          success: true,
          message: "OTP sent successfully",
        });
  } catch (err) {
    console.error('Error sending otp:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to send OTP',
    });
  }
};

export const getMemberOtpVerify = async (req, res) => {
  try {
      
      const { membership_no, otp } = req.body;

      if (!membership_no || !otp) {
        return res.status(400).json({ success: false, message: "Membership number and OTP are required" });
      }

      const latestOtp = await Otp.findOne({ 
            membership_no, 
            otp, 
            isExpired: false 
          }).sort({ createdAt: -1 }); // Get the latest one
      
          if (!latestOtp) {
            return res.status(401).json({ success: false, message: "Invalid or expired OTP" });
          }
      
          if (new Date() > latestOtp.expiresAt) {
            latestOtp.isExpired = true;
            await latestOtp.save();
            return res.status(401).json({ success: false, message: "OTP has expired" });
          }

    // Mark the OTP as used
    latestOtp.isExpired = true;
    await latestOtp.save();

    return res.status(200).json({ success: true, message: "OTP verified successfully" });

  } catch (err) {
      console.error("Verify OTP error:", err.message || err);
      return res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
};

export const getMemberChangePassword = async (req, res) => {
  try {
    const { membership_no, new_password } = req.body;

    if (!membership_no || !new_password) {
      return res.status(400).json({ message: 'membership_no/new_password is required' });
    }

    // Call external API to fetch profile
    const url = `${process.env.BASE_URL}/api/member/changepwd/${membership_no}/${new_password}`;
    const response = await pushToURL(url, {}, "GET");
    
    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch',
      });
    }

    if (response.data !== 'true') {
      return res.status(401).json({
        success: false,
        message: 'Unable to change password. Please check your membership number or try again later.',
      });
    }

    res.json({
      success: true,
      member: response.data || {},
    });

  } catch (err) {
    console.error('Error fetching membership id:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Invalid membership id',
    });
  }
};