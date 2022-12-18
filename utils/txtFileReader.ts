import fs from "fs";
export class TxtFileReader<T extends string> {
  data: T[] = [];

  constructor(public filename: string) {}

  read(splitArg?: string): void {
    this.data = fs
      .readFileSync(this.filename, {
        encoding: "utf-8",
      })
      .split(splitArg ?? "\n") as T[];

  }
}