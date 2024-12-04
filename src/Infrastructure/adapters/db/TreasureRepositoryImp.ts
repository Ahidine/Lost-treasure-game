import { TreasureRepository } from "@/Applications/Ports/spi/TreasureRepository";
import { Treasure } from "@/Domain/entities/Treasure";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { firestore } from "./firestoreConfig";

export class TreasureRepositoryImp implements TreasureRepository {
  private treasuresCollection = collection(firestore, "treasures");

  async getTreasures(): Promise<Treasure[]> {
    try {
      const querySnapshot = await getDocs(this.treasuresCollection);
      const treasures = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as Treasure)
      );
      return treasures;
    } catch (error) {
      throw new Error("Error while getting treasures");
    }
  }

  async saveTreasure(treasure: Treasure): Promise<void> {
    try {
      await addDoc(this.treasuresCollection, { ...treasure });
    } catch (error) {
      throw new Error("Error while saving treasure");
    }
  }
}
