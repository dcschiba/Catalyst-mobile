import { handleActions } from 'redux-actions';
import { CHANGE_LOCALE } from '../constants/ActionTypes';

/* eslint-disable global-require,import/no-dynamic-require */
const locale = window.localStorage.getItem('locale') || 'ja';
let messages;
let funcMasterArray;
const funcMasterObject = {};
// メッセージを取得
try {
  messages = require(`../locales/${locale}/messages.json`);
} catch (error) {
  if (error.message.indexOf('Cannot find module') !== -1) {
    messages = require('../locales/ja/messages.json');
  } else {
    throw error;
  }
}

// 機能一覧を取得
try {
  funcMasterArray = require(`../locales/${locale}/functionList.json`);
} catch (error) {
  if (error.message.indexOf('Cannot find module') !== -1) {
    funcMasterArray = require('../locales/ja/functionList.json');
  } else { throw error; }
}
funcMasterArray.forEach((func) => {
  funcMasterObject[func.path] = func;
});

const initialState = {
  locale,
  messages,
  funcMasterArray,
  funcMasterObject,
};

export default handleActions({
  [CHANGE_LOCALE]: (state, action) => {
    const newLocale = action.payload.locale;
    let newMessages;
    let newfuncMasterArray;
    const newfuncMasterObject = {};
    // メッセージを取得
    try {
      newMessages = require(`../locales/${newLocale}/messages.json`);
    } catch (error) {
      if (error.message.indexOf('Cannot find module') !== -1) {
        newMessages = require('../locales/ja/messages.json');
      } else {
        throw error;
      }
    }

    // 機能一覧を取得
    try {
      newfuncMasterArray = require(`../locales/${newLocale}/functionList.json`);
    } catch (error) {
      if (error.message.indexOf('Cannot find module') !== -1) {
        newfuncMasterArray = require('../locales/ja/functionList.json');
      } else { throw error; }
    }
    newfuncMasterArray.forEach((func) => {
      newfuncMasterObject[func.path] = func;
    });
    return {
      locale: newLocale,
      messages: newMessages,
      funcMasterArray: newfuncMasterArray,
      funcMasterObject: newfuncMasterObject,
    };
  },
}, initialState);

