/**
 * @name: 一些常量
 */

const domain = 'http://mimikj.com:6060';
// const domain = 'http://test.mimikj.com:6060'; // 测试

const NEWS_PATH = {
  index: '/web/index',
  newsDetail: '/web/news/detail',
};

const NEWS_API = {
  // 今日接口
  getList: (symbol) => {
    if (symbol === '1') {
      return domain + '/mimikj/trigger/infor_flow_td/list';
    }
    return `${domain}/mimikj/trigger/infor_flow/${symbol}/list`;
  },
  getLatestPrice: domain + '/mimikj/trigger/infor_flow/get_latest_price', // 获取顶部最新价格接口
  getStockList: domain + '/mimikj/trigger/stock/list', // 获取自选股
};

export { NEWS_API, domain, NEWS_PATH };
