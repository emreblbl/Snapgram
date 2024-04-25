import { ID, Query } from "appwrite";
import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";
import { Url } from "url";
import { emitWarning } from "process";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw new Error("Account not created");

    const avatarUrl = await avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      imageUrl: avatarUrl,
      username: user.username,
    });
    return newAccount;
  } catch (error) {
    console.log(error);
    return error;
  }
}

 
export async function signInAccount(user: { email: string; password: string }) {
  try{
    const session = await account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
  }}


export async function getCurrentUser(){
  try{
    const currentAccount = await account.get();

    if(!currentAccount) throw new Error("Account not found");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('account',currentAccount.$id)]
    )
    if(!currentUser) throw new Error("User not found");
    return currentUser.documents[0];
  }
  catch(error){
    console.log(error);
  }}
