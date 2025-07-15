'use client';

import { TweetCard } from '@/components/tweet-card';
import { motion } from 'framer-motion';

// Mock data for tweets
const mockTweets = [
  {
    id: '1',
    author: {
      name: 'Solana Foundation',
      handle: 'solana',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2',
      wallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgHLa'
    },
    content: 'Building the future of Web3 with lightning-fast transactions and minimal fees. The Solana ecosystem continues to grow with innovative dApps and DeFi protocols! 🚀',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    likes: 342,
    replies: 89,
    retweets: 156,
    liked: false,
    retweeted: false
  },
  {
    id: '2',
    author: {
      name: 'Phantom Wallet',
      handle: 'phantom',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2',
      wallet: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM'
    },
    content: 'Just launched our new mobile app with enhanced security features and seamless NFT management. Your digital assets have never been safer! 🔐 #PhantomWallet #Solana',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    likes: 1205,
    replies: 234,
    retweets: 567,
    liked: true,
    retweeted: false
  },
  {
    id: '3',
    author: {
      name: 'Magic Eden',
      handle: 'magiceden',
      avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2',
      wallet: 'MEisE1HzehtrDpAAT8PnLHjpSSkRYakotTuJRPjTpo8'
    },
    content: 'NFT volume on Solana is exploding! 📈 Our marketplace processed over 100,000 transactions this week. The creators and collectors are building something amazing together.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    likes: 892,
    replies: 167,
    retweets: 445,
    liked: false,
    retweeted: true
  },
  {
    id: '4',
    author: {
      name: 'Serum DEX',
      handle: 'projectserum',
      avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2',
      wallet: '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin'
    },
    content: 'DeFi summer is here! 🌞 Trading volume reached an all-time high this month. Thanks to our community for making decentralized finance accessible to everyone.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8),
    likes: 654,
    replies: 98,
    retweets: 298,
    liked: false,
    retweeted: false
  },
  {
    id: '5',
    author: {
      name: 'Raydium',
      handle: 'raydiumprotocol',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2',
      wallet: '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8'
    },
    content: 'Yield farming opportunities are growing! 🌱 New liquidity pools launching this week with competitive APY rates. Join the DeFi revolution on Solana.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
    likes: 423,
    replies: 76,
    retweets: 189,
    liked: true,
    retweeted: false
  }
];

export function Feed() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="flex-1 max-w-2xl mx-auto border-x min-h-screen"
    >
      <div className="sticky top-16 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b p-4">
        <motion.h1
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-xl font-bold"
        >
          Home
        </motion.h1>
      </div>
      
      <div className="divide-y">
        {mockTweets.map((tweet, index) => (
          <TweetCard key={tweet.id} tweet={tweet} index={index} />
        ))}
      </div>
    </motion.div>
  );
}