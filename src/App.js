import React from 'react';
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';
import { store } from './stores';
import { color } from './config';

const Icon = require('react-native-vector-icons/Entypo');

let listIcon;
let calendarIcon;

registerScreens(store, Provider);

/*
  login 여부에 따라 바꾸는 건 이것좀 참고함.
  https://github.com/wix/react-native-navigation/blob/master/old-example-redux/src/app.js
  이것좀 참고함.
*/
class App extends React.Component {
  constructor(props) {
    super(props);
    this._populateIcons().then(() => {
      /*
        redux의 state가 바뀔 때 마다 onStoreUpdate를 event handler로 사용
        store.subscribe(this.onStoreUpdate);
      */
      this.isLoggedIn = true;
      this.startApp(); // store.getState().account.get('isLoggedIn')
    }).catch((error) => {
      console.error(error);
    });
  }
  /*
  onStoreUpdate = () => {
    let {account} = store.getState();

    if (this.currentAccount != account) {
      this.currentAccount = account;
      this.startApp(account.get('isLoggedIn'));
    }
  }
  react-vector-icon을 로딩시켜주는 작업. 이미지로 뽑을지 이걸로 할지 결정.
  https://github.com/wix/react-native-navigation/issues/43#issuecomment-223907515
  */
  _populateIcons = function populate() {
    return new Promise((resolve, reject) => {
      Promise.all([
        Icon.getImageSource('list', 20),
        Icon.getImageSource('calendar', 20),
      ]).then((values) => {
        [listIcon, calendarIcon] = values;
        resolve(true);
      }).catch((error) => {
        console.log(error);
        reject(error);
      }).done();
    });
  };
  startApp() {
    const { isLoggedIn } = this;
    /* Login 여부에 따라 화면 결정 */
    if (isLoggedIn) {
      Navigation.startTabBasedApp({
        tabs: [{
          label: 'TaskList',
          screen: 'main.TaskList',
          title: 'TaskList',
          icon: listIcon,
        }, {
          label: 'Calendar',
          screen: 'main.CalendarView',
          title: 'Calendar',
          icon: calendarIcon,
        }],
        animationType: 'none',
        tabsStyle: {
          tabBarBackgroundColor: color.lightgray,
          tabBarButtonColor: '#A5A9AE',
          tabBarSelectedButtonColor: color.skyblue,
          tabFontFamily: 'BioRhyme-Bold',
          forceTitlesDisplay: true,
        },
        appStyle: {
          tabBarBackgroundColor: color.lightgray,
          tabBarButtonColor: '#A5A9AE',
          navBarTextColor: color.lightgray,
          navBarButtonColor: color.lightgray,
          tabBarSelectedButtonColor: color.skyblue,
          navigationBarColor: '#04ACF4',
          navBarBackgroundColor: color.skyblue,
          statusBarTextColorScheme: 'light',
          tabFontFamily: 'BioRhyme-Bold',
          keepStyleAcrossPush: false,
        },
      });
    } else {
      Navigation.startSingleScreenApp({
        screen: {
          screen: 'main.Login', // unique ID registered with Navigation.registerScreen
          title: 'Welcome', // title of the screen as appears in the nav bar (optional)
          navigatorStyle: {}, // override the navigator style for the screen
          navigatorButtons: {}, // override the nav buttons for the screen
        },
      });
    }
  }
}

export default App;
