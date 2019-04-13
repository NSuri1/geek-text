import React, { Component } from "react";
import PropTypes from "prop-types";
import "./CustomQuantitySelector.css";

class CustomQuantitySelector extends Component {
  constructor(props) {
    super(props);

    this.state = { value: this.props.book.quantity };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    const newValue = this.state.value + 1;

    if (newValue > 10) {
        return;
    }
    this.setState({
      value: newValue
    });
    this.handleChangeBookQuantity(newValue, this.props.book.book_id);
  }

  decrement() {
    const newValue = this.state.value - 1;
    this.setState({
      value: newValue
    });
    this.handleChangeBookQuantity(newValue, this.props.book.book_id);
  }

  handleChangeBookQuantity(e, book_id) {
    this.props.handleChangeBookQuantity(book_id, e);
  }

  render() {
    return (
      <div>
        <div className="quantity-input">
          <button
            className="quantity-input__modifier quantity-input__modifier--left"
            onClick={this.decrement}
          >
            -
          </button>
          <input
            className="quantity-input__screen"
            type="text"
            value={this.state.value}
            readOnly
          />
          <button
            className="quantity-input__modifier quantity-input__modifier--right"
            onClick={this.increment}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}

CustomQuantitySelector.propTypes = {
  book: PropTypes.object
};

export default CustomQuantitySelector;
