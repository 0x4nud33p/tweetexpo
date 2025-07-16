import { PublicKey, Connection } from '@solana/web3.js';

const PROGRAM_ID = new PublicKey("YOUR_PROGRAM_ID");

export async function checkUsernameAvailable(
  username: string,
  connection: Connection
): Promise<boolean> {
  const [profilePDA] = await PublicKey.findProgramAddressSync(
    [Buffer.from("user_profile"), Buffer.from(username)],
    PROGRAM_ID
  );

  const accountInfo = await connection.getAccountInfo(profilePDA);
  return !accountInfo; 
}


