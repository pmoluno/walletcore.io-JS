const WalletCoreAPI = require('./WalletCoreAPI');

async function main() {
    const api = new WalletCoreAPI();
    api.setup('your_private_key', 'your_public_key');

    try {
        // Get callback address
        const callbackAddress = await api.getCallbackAddress('BTC');
        console.log('Callback Address:', callbackAddress);

        // Create withdrawal
        const withdrawal = await api.createWithdrawal(0.1, 'BTC', 'btc_address_here');
        console.log('Withdrawal:', withdrawal);

        // Get history
        const history = await api.getHistory();
        console.log('History:', history);
    } catch (error) {
        console.error('Error:', error);
    }
}

main();