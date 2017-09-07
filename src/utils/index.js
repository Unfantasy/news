import ajax from './ajax';
import fetch from './fetch';
import dateFormatter from './lib/dateLib';
import m from './math';

const toDemical = m.toDemical;

// url获取参数
function getUrlParams() {
  const paramStr = location.href.split('?')[1] || '';

  if (paramStr === null) {
    return {};
  }

  if (paramStr === '') {
    return {};
  }

  const params = {};

  const arr = paramStr.split('&');
  for (let i = 0; i < arr.length; i += 1) {
    const ar = arr[i].split('=');
    params[ar[0]] = decodeURIComponent(ar[1]);
  }

  return params;
}

export { ajax, fetch, dateFormatter, toDemical, getUrlParams };
