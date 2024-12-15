import { Loggable } from "@/types/mixins";

export interface VscodeCommand {
  id: string;
  execute(): Promise<void>;
}

class EmptyBase {}

export abstract class BaseCommand
  extends Loggable(EmptyBase)
  implements VscodeCommand
{
  abstract id: string;

  constructor() {
    super();
  }

  abstract execute(): Promise<void>;

  dispose(): void {
    this.logger.dispose();
  }
}
