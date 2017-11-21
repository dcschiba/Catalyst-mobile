class WrapMessages {
  static setMessagesJson(json) {
    WrapMessages.messages = json;
  }
  static getMessage(id) {
    if (WrapMessages.messages && WrapMessages.messages[id]) {
      return WrapMessages.messages[id];
    }
    return id;
  }
}

export default WrapMessages;
