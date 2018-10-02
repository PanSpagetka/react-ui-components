import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'patternfly-react';

export default class Chip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
    this.chipRef = React.createRef();
  }

  componentDidMount() {
    this.props.registerChip(this.chipRef);
  }

  componentWillUnmount() {
    this.props.unregisterChip(this.props.index);
  }

  render() {
    // console.log('focused: ', this.state.focused)
    return (
      <span
        ref={this.chipRef}
        onKeyDown={this.props.onKeyDown}
        tabIndex="0"
        // onFocus={this.props.onFocus}
        // onBlur={this.props.onBlur}
      >
        <Label
          onRemoveClick={this.props.onDelete}
          onClick={this.props.onClick}
          onDoubleClick={this.props.onDoubleClick}
        >
          {this.props.label}
        </Label>
      </span>
    );
  }
}

Chip.propTypes = {
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
  onDelete: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  label: PropTypes.string.isRequired,
  index: PropTypes.number,
  onKeyDown: PropTypes.func,
  registerChip: PropTypes.func,
  unregisterChip: PropTypes.func,
};

Chip.defaultProps = {
  onFocus: () => {},
  onBlur: () =>  {}
}
