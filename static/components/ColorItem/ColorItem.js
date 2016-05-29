import './ColorItem.scss';

import React, { PropTypes, Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ColorName from '../ColorName/ColorName';
import ColorPicker from '../ColorPicker/ColorPicker';
import SliderIcon from '../SliderIcon/SliderIcon';
import InterfaceTheme from '../InterfaceTheme/InterfaceTheme';

class ColorItem extends Component {
  handlePickerToggle() {
    this.props.onTogglePicker(this.props.color);
  }
  handleColorChange(newColor) {
    this.props.onSubmit(this.props.color, newColor.hex.toUpperCase());
  }
  render() {
    const { color, colorValue, onSubmit, onChange } = this.props;
    return (
      <li key={color.id} style={{ backgroundColor: color.color }} className="color">
        <InterfaceTheme color={color.color}>
          <div className="color-container">
            <ColorName
              color={color}
              colorValue={colorValue}
              onChange={onChange}
              onSubmit={onSubmit}
            />
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>
          <SliderIcon onToggle={this.handlePickerToggle.bind(this)} />
          <ReactCSSTransitionGroup
            transitionName={"color-picker-animation"}
            transitionEnterTimeout={175}
            transitionLeaveTimeout={175}
          >
            {color.pickerActive ?
              <ColorPicker
                onChange={this.handleColorChange.bind(this)}
                onToggle={this.handlePickerToggle.bind(this)}
                color={color.color}
              />
              : null
            }
          </ReactCSSTransitionGroup>
          <div className="color-footer">
            <div className="instructions-container dislike">
              <span className="keyboard-button">D</span>
              <span className="keyboard-text">Disike</span>
            </div>
            <div className="instructions-container like">
              <span className="keyboard-button">L</span>
              <span className="keyboard-text">Like</span>
            </div>
          </div>
        </InterfaceTheme>
      </li>
    );
  }
}

ColorItem.propTypes = {
  color: PropTypes.object.isRequired,
  colorValue: PropTypes.string.isRequired,
  onTogglePicker: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ColorItem;