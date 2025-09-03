const paypal = require('paypal-rest-sdk');

paypal.configure({
    mode: 'sandbox',
    client_id: 'AQeUFvVmkokTrkrYlEGQr-iwJz9N0BpgJ7UUP6vfSQGhNiyXYbisYDkEmj0ftpc5Ws783xCj6JJNs4p0',
    client_secret: 'EGUW1rBg3T7oneC-MVCoKgUR-PRi8GKVm97pD3-m73qEg-EwMg-neE87esRFu8CPQNzXX2HPexsHI_ks'
})

module.exports = paypal