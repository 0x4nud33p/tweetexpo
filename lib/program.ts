import { Program, AnchorProvider, web3 } from "@coral-xyz/anchor";
// import idl from "@/idl/dtwitter.json";
import { Connection } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";


const programId = new PublicKey("7wVTf1rNPS4w83hkwbXA4UtW1hrq1woghy9ksQkLwpo7");

export async function createUserProfile(
  profileCid: string,
  username: string,
  walletAddress: string,
  connection: Connection
) {
//   const provider = new AnchorProvider(connection, window["solana"], {});
//   const program = new Program(idl as any, programId, provider);

  const [profilePDA] = web3.PublicKey.findProgramAddressSync(
    [Buffer.from("user_profile"), Buffer.from(username)],
    programId
  );

//   await program.methods
//     .createUserProfile(username, profileCid)
//     .accounts({
//       userProfile: profilePDA,
//       authority: new web3.PublicKey(walletAddress),
//       systemProgram: web3.SystemProgram.programId,
//     })
//     .rpc();
}
