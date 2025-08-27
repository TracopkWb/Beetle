import crypto from 'crypto';

function generateHash(data){
    return crypto
    .createHash('sha256')
    .update(JSON.stringify(data))
    .digest('hex');
}
// import crypto from 'crypto';

export default  {
    generateHash,
}
