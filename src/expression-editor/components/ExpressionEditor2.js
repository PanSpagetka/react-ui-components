import React from 'react';
import PropTypes from 'prop-types';
import EditableChip from './EditableChip'

import Expression from './Expression'
import ExpressionEditorPropTypes from './ExpressionEditorPropTypes'
const userInputMock = [{ id: 666, label: '', type: 'userinput', next: [], flags: {}, parent: null }];

class ExpressionEditor2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {chipRefs: [], prevKeyPressed: undefined, inputRef: React.createRef()};
  }

  registerChip = (chipRef) => {
    // console.log('CHIP REF', chipRef);
    this.setState(prevState => ({chipRefs: [...prevState.chipRefs, chipRef]}));
  }

  unregisterChip = (index) => {
    this.state.chipRefs.splice(index, 1);
    this.setState({chipRefs: [...this.state.chipRefs]});
  }

  focusChip = (index) => {
    // console.log('AAAAAAAAAAAAAAAAAAAAAAAAa', this.state.chipRefs[index]);
    this.state.chipRefs[index].current.focus();
  }

  focusInput = () => {
    this.state.inputRef.current.focus();
  }

  onKeyDown = (key, index, selected, expression) => {
    console.log(this.state.inputRef);
    // console.log('on key down', key, index);
    if(key.keyCode === 37) {
      index = index <= 0 ? index : index - 1;
      this.state.chipRefs[index].current.focus();
    } else if(key.keyCode === 39) {
      if (index >= this.state.chipRefs.length - 1) {
        this.focusInput();
      } else {
        // index = index >= 0 ? index : index + 1;
        this.state.chipRefs[index + 1].current.focus();
      }
    }
    else if(key.keyCode === 13) {
      // console.log('on enter key down', selected, expression);
      this.props.onClick(selected, expression);
    } else if (key.keyCode === 8 || key.keyCode === 46) {
      this.onDelete(selected, expression)
    }

    this.setState({prevKeyPressed: key});
  }

  onSubmit = (selected, previous, expression) => {
    this.focusInput();
    this.props.onSubmit(selected, previous, expression);
  }

  onDelete = (selected, expression) => {
    console.log('DDDDDDDDDDDDDDDDDDDDDDD');
    this.focusInput();
    this.props.onDelete(selected, expression);
  }


  generateExpression = (expression, index) => (
    <Expression
      key={index}
      onClick={this.focusChip}
      onDoubleClick={this.props.onClick}
      onSubmit={this.onSubmit}
      onKeyDown={this.onKeyDown}
      onDelete={this.onDelete}
      onFocus={this.props.onFocus}
      onBlur={this.props.onBlur}
      onKeyDown={this.onKeyDown}
      expression={expression}
      registerChip={this.registerChip}
      unregisterChip={this.unregisterChip}
      // registerInput={this.registerInput}
      // unregisterInput={this.unregisterInput}
      inputRef={this.state.inputRef}
      next={{...userInputMock[0],
        parent: (expression[expression.length - 1] && expression[expression.length - 1].term ||
         this.props.next)}}
    />
  )

  render () {
      return (
        this.props.expressions.map( ((expression, index) => (this.generateExpression(expression, index))) )
      );
  }
}


ExpressionEditor2.propTypes = {
  // isEditing: PropTypes.arrayOf(),
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  expressions: PropTypes.arrayOf(ExpressionEditorPropTypes.expression),
  next: ExpressionEditorPropTypes.term,

}

ExpressionEditor2.defaultProps = {

}

export default ExpressionEditor2;
