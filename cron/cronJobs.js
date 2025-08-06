const cron = require('node-cron');

// Schedule a task to run every minute
cron.schedule('* * * * *', () => {
  console.log('This task runs every minute');
});

// You can add more cron jobs here as needed
