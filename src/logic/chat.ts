import User from '@/logic/user';
import { ref, Ref } from 'vue';

interface IChatItem {
  time: number;
  from: string;
  to: string | null;
  message: string;
}

class Chat {
  static #onlyInstance: Chat | null = null;

  public chatHistory: Ref<Array<IChatItem>> = ref(TEST_CHAT);

  constructor() {
    if (Chat.#onlyInstance) return Chat.#onlyInstance;
    Chat.#onlyInstance = this;
  }

  sendMessage = (message: string, to: string | null = null): void => {
    this.chatHistory.value.push({ time: Date.now(), from: User.username, to, message });
  };
}

const TEST_CHAT = [
  {
    time: 1721083068227,
    from: 'MGDArrow',
    to: null,
    message: 'Привет, не подскажите, как играть в эту игрушку??',
  },
  {
    time: 1721083078227,
    from: 'Vadim228',
    to: 'MGDArrow',
    message: 'Да без проблем, сначала правила прочитай',
  },
  {
    time: 1721083088227,
    from: 'Vadim228',
    to: null,
    message: 'После этого просто начинай игру и делай упор на уровень',
  },
  {
    time: 1721083098227,
    from: 'Vadim228',
    to: null,
    message: 'Ну и набирай монеты, не забывай апать башню',
  },
  {
    time: 1721083108227,
    from: 'Vadim228',
    to: null,
    message: 'Карточки когда откроются, набирай как можно больше',
  },
  {
    time: 1721083118227,
    from: 'Vadim228',
    to: null,
    message: 'А еще, чтобы лаборатория не простаивала',
  },
  {
    time: 1721083128227,
    from: 'IgorAKNagibator',
    to: 'Vadim228',
    message: 'Да, уровень очень важен в игре!!',
  },
  {
    time: 1721083138227,
    from: 'MGDArrow',
    to: null,
    message: 'Спасибо, ребят, помогли',
  },
];

export default new Chat();
