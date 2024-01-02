
import { getTornamentsListClient } from "./const";


export async function getTornamentList() {
  const client = getTornamentsListClient();
    const response = await fetch(client.url,{method:client.method});
    if (response.status === 200){
      const tornaments = await response.json();
      return tornaments;
      }
      else{
        const errorMsg = response.statusText;
        throw new Error(errorMsg);
      }

  }