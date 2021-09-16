import React, {
  useState, useEffect, useMemo
} from 'react';
import PropTypes from 'prop-types';
import '../scss/customInputNumber.scss';

/** 客製化input
  * @param {string} name 名稱
  * @param {number} value 初始值
  * @param {number} step 按鈕增減的數字
  * @param {number} min 最小值
  * @param {number} max 最大值
  * @param {boolean} disabled disabled
  * @param {boolean} addDisabled 增加的disabled
  * @param {boolean} reduceDisabled 減少的disabled
  * @param {function} onChange onChange
*/
const CustomInputNumber = (props) => {
  const {
    name, step, min, max, disabled, addDisabled, reduceDisabled, onChange
  } = props;
  const [value, setValue] = useState([]);

  useEffect(() => {
    setValue(props.value);
  }, []);

  const add = (e) => {
    if (value < max) {
      e.target.value = Number(e.target.value) + step;
      setValue(c => c + step);
      onChange(e);
    }
  };
  const reduce = (e) => {
    if (value > min) {
      e.target.value = Number(e.target.value) - step;
      setValue(c => c - step);
      onChange(e);
    }
  };
  const intputText = (e) => {
    let result = Number(e.target.value);
    if (Number(e.target.value) < min) {
      e.target.value = Number(min);
      result = Number(min);
    } else if (Number(e.target.value) > max) {
      e.target.value = Number(max);
      result = Number(max);
    }
    setValue(result);
  };

  return (
  <>
    <div id="a" className="number-input" onChange={(e) => { onChange(e); }}>
      <button className="button" type="button" name={name} value={value} disabled={reduceDisabled} onClick={e => reduce(e)}>- </button>
      <input className="button" type="text" name={name} value={value} disabled={disabled} onChange={e => intputText(e)} />
      <button className="button" type="button" name={name} value={value} disabled={addDisabled} onClick={e => add(e)}>+ </button>
    </div>
  </>
  );
};

CustomInputNumber.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomInputNumber;
