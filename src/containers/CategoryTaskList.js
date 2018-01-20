import React, { Component } from 'react'
import { View , StyleSheet} from 'react-native'
import { List, Text, ListItem, Content} from 'native-base';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {Fab} from '../components';
import {openAddTask, closeAddTask} from '../actions/task';

class CategoryTaskList extends Component {
  handleFabPress = () => {
    let data = {
      category: this.props.navigation.state.params.category
    };
    this.props.openAddTask('category',data);
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <Fab handleFabPress={this.handleFabPress} icon='pencil'/>
        <Text>hi</Text>
        <List >
          {this.props.task.getIn(['list','tasks',this.props.navigation.state.params.category])?
            this.props.task.getIn(['list','tasks',this.props.navigation.state.params.category]).map((el,i)=>{
            return <ListItem style={styles.listItem} key={i}><Text>{el.get('description')}</Text></ListItem>
          }):null}
        </List>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: '100%', 
    marginLeft: 0, 
    paddingLeft: 0, 
    paddingRight: 0, 
    marginRight: 0
  }
})
const mapStateToProps = (state) => {
  return {
    task: state.task,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    openAddTask: (taskType ='category', data={})=> {
      dispatch(openAddTask(taskType, data));
    },
    closeAddTask: () => {
      dispatch(closeAddTask());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryTaskList)
