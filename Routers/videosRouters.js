import express from 'express'
import { fetchChannelData, fetchVideoComments, fetchingFeedVideos, recommendedVideos, videosDetails } from '../Controllers/videosControllers.js'

const router = express.Router()

router.get('/feed-videos', fetchingFeedVideos)
router.get('/videos', videosDetails)
router.get('/channel-data', fetchChannelData)
router.get('/video-comments', fetchVideoComments)
router.get('/recommended-videos', recommendedVideos)

export default router