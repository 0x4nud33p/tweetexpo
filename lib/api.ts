// Placeholder function to simulate fetching tweet data
export interface TweetData {
  username: string
  handle: string
  profilePic: string
  caption: string
  videoUrl: string
}

export async function fetchTweetData(url: string): Promise<TweetData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Return dummy data
  return {
    username: "Anudeep",
    handle: "@anudeep",
    profilePic: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    caption: "Just discovered this amazing new feature! The video quality is absolutely incredible and the user experience is so smooth. Can't wait to see what everyone thinks about this update. #tech #innovation",
    videoUrl: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
  }
}