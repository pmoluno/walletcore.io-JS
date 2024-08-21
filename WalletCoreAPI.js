class WalletCoreAPI {
    constructor() {
        this.privateKey = '';
        this.publicKey = '';
    }

    setup(privateKey, publicKey) {
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }

    async getCallbackAddress(currency, ipnUrl = '') {
        const req = {
            currency: currency,
            ipn_url: ipnUrl,
        };
        return this.apiCall('get_callback_address', req);
    }

    async createWithdrawal(amount, currency, address, ipnUrl = '') {
        const req = {
            amount: amount,
            currency: currency,
            address: address,
            ipn_url: ipnUrl,
        };
        return this.apiCall('create_withdrawal', req);
    }

    async getHistory(currency = 'ALL') {
        const req = {
            currency: currency,
        };
        return this.apiCall('get_history', req);
    }

    isSetup() {
        return (this.privateKey !== '' && this.publicKey !== '');
    }

    async apiCall(cmd, req = {}) {
        if (!this.isSetup()) {
            return { error: 'You have not called the setup function with your private and public keys!' };
        }

        req.version = 1;
        req.cmd = cmd;
        req.key = this.publicKey;

        const postData = new URLSearchParams(req).toString();
        const hmac = await this.generateHmac(postData, this.privateKey);

        try {
            const response = await fetch('https://member.walletcore.io/api.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'HMAC': hmac
                },
                body: postData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return { error: `Fetch error: ${error.message}` };
        }
    }

    async generateHmac(message, key) {
        const encoder = new TextEncoder();
        const keyData = encoder.encode(key);
        const messageData = encoder.encode(message);

        const cryptoKey = await crypto.subtle.importKey(
            'raw', keyData, { name: 'HMAC', hash: 'SHA-512' },
            false, ['sign']
        );

        const signature = await crypto.subtle.sign(
            'HMAC', cryptoKey, messageData
        );

        return Array.from(new Uint8Array(signature))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }
}

module.exports = WalletCoreAPI;