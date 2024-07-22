import { Ref, ref } from 'vue';

class Messages {
  static #onlyInstance: Messages | null = null;
  messages: Ref<Array<MessagesBuilder>> = ref([]);
  constructor() {
    if (Messages.#onlyInstance) return Messages.#onlyInstance;
    Messages.#onlyInstance = this;
  }

  init() {
    this.messages.value = [];
  }

  add(text: string, color: string = 'green', icon: string = 'dollar', time: number = 1200): void {
    this.messages.value.push(new MessagesBuilder(text, color, icon, time));
  }

  tick(dt: number) {
    this.messages.value.forEach((message) => (message.time -= dt));
    this.messages.value = this.messages.value.filter((message) => message.time > 0);
  }
}

export default new Messages();

class MessagesBuilder {
  id: number = Date.now() + Math.random();
  constructor(
    readonly text: string,
    readonly color: string,
    readonly icon: string,
    public time: number,
  ) {}
}
