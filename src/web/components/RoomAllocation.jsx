import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../scss/roomAllocation.scss';
import CustomInputNumber from './CustomInputNumber';

/**  房間人數分配
  * rule : 未分配人數小於1, 全部房間不能新增
  * @param {number} guest 未分配客戶總數量
  * @param {number} room 動態新增房間數量
  * @param {function} onChange onChange
*/
const RoomAllocation = (props) => {
  const {
    guest, room, onChange,
  } = props;

  // CustomInputNumber 的初始化input
  const [state, setState] = useState({
    max: 4,
    min: 1,
    value: 1,
    step: 1,
    addDisabled: false,
    reduceDisabled: false,
  });

  // 顯示房間狀態, CustomInputNumber 的 onChange
  const handleChange = (e) => {
    if (e) {
      const { name, value } = e.target;
      setRoomState(prevState => ({ ...prevState, [name]: Number(value) }));
      console.log('[name]:', name, '[value]:', value);
    }
  };

  // 初始化房間
  const initRoom = (roomCount) => {
    const temp = [];
    for (let index = 1; index <= roomCount; index += 1) {
      temp.push(
        <div key={index}>
          <p>
            {`房間: ${index} (最大:4, 最小:1)`}
          </p>
          <CustomInputNumber
            name={`room${index}`}
            value={state.value}
            step={state.step}
            min={state.min}
            max={state.max}
            disabled={state.disabled}
            addDisabled={state.addDisabled}
            reduceDisabled={state.reduceDisabled}
            onChange={e => handleChange(e)}
          />
        </div>
      );
    }
    return temp;
  };

  // 初始化房間人數狀態
  const initRoomState = (roomCount) => {
    const temp = {};
    for (let index = 1; index <= roomCount; index += 1) {
      temp[`room${index}`] = state.value;
    }
    return temp;
  };

  /** 房間人數分配
    * @param {object} roomState 各個房間的客戶數量狀態
    * @param {array} arrayCustomInputNumber 動態新增CustomInputNumber
  */
  const [roomState, setRoomState] = useState(initRoomState(room));
  const [arrayCustomInputNumber, setCustomInputNumber] = useState(initRoom(room));

  // 計算未分配人數
  const unAssignedCount = useMemo(() => {
    let AssignedCount = 0;
    Object.keys(roomState).forEach((name) => {
      AssignedCount += roomState[name];
    });
    onChange(Object.keys(roomState).map((name) => {
      return roomState[name];
    }));
    return guest - AssignedCount;
  }, [roomState]);

  // 未分配人數小於1, 全部房間不能新增
  useEffect(() => {
    if (unAssignedCount === 0) {
      setState(pre => ({ ...pre, addDisabled: true }));
    }
    if (unAssignedCount > 0) {
      setState(pre => ({ ...pre, addDisabled: false }));
    }
  }, [unAssignedCount]);

  // 不能新增人數時, 重新刷新各個CustomInputNumbe
  useEffect(() => {
    setCustomInputNumber(initRoom(room));
  }, [state.addDisabled]);

  return (
  <>
    <div className="room">
      <div>
        <p>
          {`未分配人數: ${unAssignedCount}`}
        </p>
      </div>
      {arrayCustomInputNumber}
    </div>
  </>
  );
};

RoomAllocation.propTypes = {
  guest: PropTypes.number.isRequired,
  room: PropTypes.number.isRequired,
};

export default RoomAllocation;
