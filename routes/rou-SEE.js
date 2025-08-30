// sse.js
const channels = {
    admin: [],
    user: []
};

// Add a client to a specific channel
const addClient = (res, channel) => {
    if (!channels[channel]) channels[channel] = [];

    channels[channel].push(res);

    res.on("close", () => {
        channels[channel] = channels[channel].filter(c => c !== res);
    });
}

// Send to all in a specific channel
const sendEvent = (channel, data) => {
    if (!channels[channel]) return;

    channels[channel].forEach(res => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    });
}

export default {
    addClient: addClient,
    sendEvent: sendEvent,
}