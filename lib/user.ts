import useSWR from "swr/immutable";
import { User } from "../types/user";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/client";

// useSWRを利用してuser/${id}というロッカーにuser情報を入れる処理
export const useUser = (id?: string) => {
  const { data: user } = useSWR<User>(id && `users/${id}`, async () => {
    const ref = doc(db, `users/${id}`);
    const snap = await getDoc(ref);
    return snap.data() as User;
  });

  return user;
};
