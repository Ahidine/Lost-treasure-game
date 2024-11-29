import { Reward } from "./Reward";

export class User {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public rewards: Reward[]
  ) {}
}
