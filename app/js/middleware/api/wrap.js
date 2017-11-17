import 'isomorphic-fetch';

export const WRAP_API = Symbol('WRAP_API');
/* eslint-disable no-unused-vars */
export default store => next => (action) => {
  const callApi = action.type;

  if (callApi !== WRAP_API) {
    return next(action);
  }

  const { types, endpoint } = action.payload;

  const [requestType, successType, failureType] = types;

  // リクエスト開始
  next({ type: requestType });

  // 通信処理
  return fetch(endpoint)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      // 通信成功時
      next({
        type: successType,
        payload: { data: json },
      });
      return null;
    })
    .catch((json) => {
      // 通信失敗時
      next({
        type: failureType,
        payload: { error: json.msg },
      });
    });
};
