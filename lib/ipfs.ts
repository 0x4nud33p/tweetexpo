// import { Web3Storage, File } from 'web3.storage';

// const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN! });

export async function uploadProfileToIPFS(profile: { name: string; bio: string; image: File }) {
    const metadata = {
      name: profile.name,
      bio: profile.bio,
      image: `ipfs://${profile.image.name}`,
    };
  
    const files = [
      new File([JSON.stringify(metadata)], 'profile.json'),
      profile.image,
    ];
  
    // const cid = await client.put(files);
    // return `ipfs://${cid}/profile.json`;
    return `ipfs://profile.json`;
  }
  