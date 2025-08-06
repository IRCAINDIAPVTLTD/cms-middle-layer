const axios = require('axios');
const pushToURL = require("../../helpers/pushHelper");
const Club = require("../../models/Club");

exports.getEvent = async (req, res) => {
  try {

    const page = req.query.page || 1;
    const limit = req.query.limit || 15;

    const url = `${process.env.EVENT_BASE_URL}/leads?search_query=cf_env%3Aprod&page=${page}&per_page=${limit}`;

    const headers = {
      'X-User-Email': process.env.XUSEREMAIL,
      'X-User-Token': process.env.XUSERTOKEN,
      'X-Content-Type': process.env.XCONTENTTYPE
    };

    const response = await pushToURL(url, {}, "GET", headers);
    
    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch events from external service',
      });
    }

    const events = response.data;

    if(events.meta && events.meta.count == 0)   {
        return res.status(200).json({
            success: false,
            message: 'No events found',
        });
    }

    const leads = response.data.leads;

    const eventDetails = leads.map((lead) => ({
      id: lead.id,
      title: lead.custom_field_values.event_title,
      description: lead.custom_field_values.event_description,
      startDate: lead.custom_field_values.event_start_time,
      endDate: lead.custom_field_values.eventenddate,
      location: lead.custom_field_values.location?.address || null,
      manualLocation: lead.custom_field_values.manual_location,
      status: lead.custom_field_values.isactive,
      poster: lead.custom_field_values.poster,
      category: lead.custom_field_values.event_category,
    }));

    res.status(200).json({ success: true, events: eventDetails });

  } catch (err) {
    console.error('Error fetching event data:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events',
    });
  }
};

exports.getEventbyId = async (req, res) => {
  
  try {
  
    const leadId = req.query.id;
    const url = `${process.env.EVENT_BASE_URL}/leads/${leadId}`;

    const headers = {
      'X-User-Email': process.env.XUSEREMAIL,
      'X-User-Token': process.env.XUSERTOKEN,
      'X-Content-Type': process.env.XCONTENTTYPE
    };

    const response = await pushToURL(url, {}, "GET", headers);
    
    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch events from external service',
      });
    }

    const events = response.data;

    const eventDetails = {
      id: events.lead.id,
      title: events.lead.custom_field_values.event_title,
      description: events.lead.custom_field_values.event_description,
      startDate: events.lead.custom_field_values.event_start_time,
      endDate: events.lead.custom_field_values.eventenddate,
      location: events.lead.custom_field_values.location.address,
      manualLocation: events.lead.custom_field_values.manual_location,
      status: events.lead.custom_field_values.isactive,
      poster: events.lead.custom_field_values.poster,
      category: events.lead.custom_field_values.event_category,
    };

    res.status(200).json({ success: true, events: eventDetails });

  } catch (err) {
    console.error('Error fetching event data:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events',
    });
  }
};

exports.getEventCategory = async (req, res) => {
  
  try {
  
    const url = `${process.env.EVENT_BASE_URL}/custom_fields?all=true`;

    const headers = {
      'X-User-Email': process.env.XUSEREMAIL,
      'X-User-Token': process.env.XUSERTOKEN,
      'X-Content-Type': process.env.XCONTENTTYPE
    };

    const response = await pushToURL(url, {}, "GET", headers);
    
    if (!response.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch events category from external service',
      });
    }

    const eventsCategory = response.data;

    const catList  = eventsCategory.custom_fields.find(field => field.identifier === 'event_category')

    res.status(200).json({ success: true, events_category: catList.options });

  } catch (err) {
    console.error('Error fetching event category data:', err?.response?.data || err.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch events category',
    });
  }
};
