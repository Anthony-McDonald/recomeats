const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function callVisor(imagePath) {
    const url = "https://vision.foodvisor.io/api/1.0/en/analysis/";
    const headers = {
        "Authorization": `Api-Key ${process.env.FOODVISOR_API_KEY}`,
    };

    const imageData = new FormData();
    imageData.append('image', fs.createReadStream(imagePath));

    try {
        const response = await axios.post(url, imageData, {
            headers: {
                ...headers,
                ...imageData.getHeaders() // Merging FormData headers
            }
        });
        console.log(`API response:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`API call failed:`, error.response ? error.response.data : error.message);
    }
}
module.exports = callVisor;