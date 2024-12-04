import { UserRepository } from "@/Applications/Ports/spi/UserRepository";
import { User } from "@/Domain/entities/User";
import { Reward } from "@/Domain/entities/Reward";
import { firestore } from "./firestoreConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import {
  AuthRepository,
  AuthResponse,
} from "@/Applications/Ports/spi/AuthRepository";

export class UserRepositoryImp implements UserRepository, AuthRepository {
  private usersCollection = collection(firestore, "users");
  private auth = getAuth();

  async registerUser(
    name: string,
    email: string,
    password: string
  ): Promise<AuthResponse> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      const newUser = new User(user.uid, name, user.email!, []);

      const docRef = doc(this.usersCollection, user.uid);
      await setDoc(docRef, { ...newUser });

      return { user: newUser, token: idToken };
    } catch (error) {
      throw new Error("Error registering user: " + (error as Error).message);
    }
  }

  async loginUser(email: string, password: string): Promise<AuthResponse> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();

      const userDoc = await this.getUserById(user.uid);

      return { user: userDoc, token: idToken };
    } catch (error) {
      throw new Error("Error logging in user: " + (error as Error).message);
    }
  }

  async logoutUser(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw new Error("Error logging out user: " + (error as Error).message);
    }
  }

  async updateUser(user: User): Promise<User> {
    const userDocRef = doc(this.usersCollection, user.id);
    await updateDoc(userDocRef, { ...user });
    return user;
  }

  async addRewardToUser(userId: string, reward: Reward): Promise<User> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    user.treasures.push(reward);
    return this.updateUser(user);
  }

  async getUsers(): Promise<User[]> {
    const querySnapshot = await getDocs(this.usersCollection);
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as User)
    );
  }

  async getUserByEmail(email: string): Promise<User> {
    const q = query(this.usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      throw new Error("User not found");
    }
    const userDoc = querySnapshot.docs[0];
    return { id: userDoc.id, ...userDoc.data() } as User;
  }

  async getUserById(id: string): Promise<User> {
    const userDocRef = doc(this.usersCollection, id);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      throw new Error("User not found");
    }

    return { id: userDoc.id, ...userDoc.data() } as User;
  }

  async saveUser(user: User): Promise<void> {
    await addDoc(this.usersCollection, { ...user });
  }

  async getRewardsByUserId(userId: string): Promise<Reward[]> {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return user.treasures;
  }
}
