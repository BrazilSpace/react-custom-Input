/**
 * api的input檢查基底
 * @param {object} req requset
 * @param {srting} obj 自定義input類型 ex. userInfo
 * @returns {object}
 */
class baseBean {
  constructor() {
    this.input = null;
  }

  /* eslint-disable */
  bind(req, obj) {
    // 額外綁定的參數
    if (obj) {
      this.input = {
        ...this.input,
        ...obj,
      };
    }

    for (const k in this.input) {
      let p = req.body[k];

      if (emptyCheck(p)) {
        p = req.query[k];
        if (emptyCheck(p)) {
          p = (req.files && req.files[k]);
          if (emptyCheck(p)) {
            p = null;
          }
        }
      }

      if (!emptyCheck(p)) {
        if (k !== 'sort' && typeof p === 'object' && (this.input[k] != null)) {
          Object.assign(this.input[k], p);
        } else {
          this.input[k] = p;
        }
      }
    }
  }
}

module.exports = baseBean;
