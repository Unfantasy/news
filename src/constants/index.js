/**
 * @name: 一些常量
 */

// const domain = 'http://mimikj.com:6060';
const domain = 'http://test.mimikj.com:6060'; // 测试

const NEWS_API = {
  list: domain + '/mimikj/trigger/infor_flow_td/list', // 今日接口
  getLatestPrice: domain + '/mimikj/trigger/infor_flow/get_latest_price', // 获取顶部最新价格接口
  getStockList: domain + '/mimikj/trigger/stock/list', // 获取自选股
};

export { NEWS_API, domain };
