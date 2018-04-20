import { connect } from 'react-redux'
import DublinTransit from '../components/DublinTransit'
import {
  getNearestLuasStop
} from '../actions/DublinTransitActions';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_ALL':
    default:
      return todos
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => ({
  getNearestLuasStop: () => dispatch(getNearestLuasStop())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DublinTransit)