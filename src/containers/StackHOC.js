import React, { Component } from 'react';

/*
  김범준씨 이것은 stack navigation 을 더블클릭 했을 때, 두번 열리는 것을 방지하기 위한
  Higher Order Component 입니다.
  이것이 없다면 테스크 리스트에서 카테고리를 빠르게 두 번 열립니다. 당신도 쓰십시요.
*/
export default function StackHOC(Comp) {
  return class PreventNavStackDuplicate extends Component {
    _lastAction = { params: undefined, timestamp: 0 };
    _navigated = null

    _checkLastAction = (params) => {
      if (Date.now() - this._lastAction.timestamp < 1000
        && JSON.stringify(params) === JSON.stringify(this._lastAction.params)
        && !params.force) {
        return false;
      }
      this._lastAction = { params, timestamp: Date.now() };
      return true;
    }
    push = (params = {}) => {
      if (!this._checkLastAction({ method: 'push', passProps: params.passProps, screen: params.screen })) {
        return;
      }
      this.props.navigator.push(params);
    }
    render() {
      return <Comp {...this.props} push={this.push} />;
    }
  };
}
