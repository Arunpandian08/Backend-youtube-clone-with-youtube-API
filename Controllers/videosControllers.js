import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const fetchingFeedVideos = async (request, response) => {
    const category = request.query.videoCategoryId;
    if (!category) {
        return response.status(400).send({ message: "Category is required" });
    }
    try {
        const fetchVideos = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails%2Csnippet%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${process.env.API_KEY}`);
        return response.status(200).send({
            message: "Data fetched successfully",
            data: fetchVideos.data,
        });
    } catch (error) {
        console.error("Error fetching videos:", error.response ? error.response.data : error.message);
        return response.status(400).send({
            message: "Error fetching videos",
            error: error.response ? error.response.data : error.message,
        });
    }
};

export const videosDetails = async (request, response) => {
    const videoId = request.query.id
    try {
        const fetchingVideoDetails = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${videoId}&key=${process.env.API_KEY}`)
        return response.status(200).send({ message: 'Video Details Fetched Successfully', data: fetchingVideoDetails.data })
    } catch (error) {
        console.error("Error fetching video details:", error.response ? error.response.data : error.message);
        return response.status(400).send({
            message: "Error fetching video Details",
            error: error.response ? error.response.data : error.message,
        });
    }
}


export const fetchChannelData = async (request, response) => {
    const channelId = request.query.channelId; 
    try {
        if (channelId) {
            const channelDataUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails%2Csnippet%2Cstatistics&&id=${channelId}&key=${process.env.API_KEY}`;
            const channelResponse = await axios.get(channelDataUrl);
            if (!channelResponse.data || !channelResponse.data.items || channelResponse.data.items.length === 0) {
                throw new Error('Channel data not found');
            }
            const channelData = channelResponse.data.items[0];
            return response.status(200).json({ channelData });
        } else {
            throw new Error('Channel ID is missing');
        }
    } catch (error) {
        console.error('Error fetching channel data:', error.message);
        return response.status(500).json({ error: 'Failed to fetch channel data' });
    }
};

export const fetchVideoComments = async (request, response) => {
    const videoId = request.query.videoId
    try {
        const fetchingComments = await axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&videoId=${videoId}&key=${process.env.API_KEY}`)

        return response.status(200).send({ message: 'Video Comments Fetched Successfully', data: fetchingComments.data })
    } catch (error) {
        console.error("Error fetching video Comments:", error.response ? error.response.data : error.message);
        return response.status(400).send({
            message: "Error fetching video Comments",
            error: error.response ? error.response.data : error.message,
        });
    }
}

export const recommendedVideos = async (request,response)=>{
    const categoryId = request.query.videoCategoryId
    try {
        const fetchRecommendedVideos = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails%2Csnippet%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&videoCategoryId=${categoryId?categoryId:0}&key=${process.env.API_KEY}`)
        return response.status(200).send({message:"data Fetched Successful",data:fetchRecommendedVideos.data})
    } catch (error) {
        console.error("Error fetching Recommended videos:", error.response ? error.response.data : error.message);
        return response.status(400).send({
            message: "Error fetching Recommended videos",
            error: error.response ? error.response.data : error.message,
        });
    }
}