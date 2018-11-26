import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

const bookInfo = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '5px',
  '& span': {
    marginBottom: '2px',
  },
  '& input': {
    marginBottom: '4px',
    padding: '5px',
    height: '25px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#9ecaed',
    boxShadow: '0 0 10px #9ecaed',
  },
});

const closeBtn = css({
  border: '1px solid green',
  margin: '20px auto 5px auto',
  width: '100px',
  padding: '8px',
  fontWeight: 'bold',
});

export default class AddBookForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      genre: '',
      price: '',
      valid: false,
    };
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeModalAndSaveBook = this.closeModalAndSaveBook.bind(this);
  }

  validateForm() {
    const { name } = this.state;
    return name !== '' ? this.setState({ valid: true }) : this.setState({ valid: false });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.validateForm();
    });
  }

  closeModalAndSaveBook(event) {
    const {
      name, genre, price, valid,
    } = this.state;
    const { closeModal, addBook } = this.props;
    event.preventDefault();
    this.validateForm();
    if (valid) {
      closeModal();
      addBook({
        name, genre, price,
      });
    }
    this.setState({
      name: '', genre: '', price: '', valid: false,
    });
  }

  render() {
    const {
      name, genre, price, valid,
    } = this.state;
    return (
      <form className={bookInfo} onSubmit={this.closeModalAndSaveBook}>
        <span>Name</span>
        <input type="text" value={name} name="name" placeholder="Name of the book" onChange={this.handleChange} />
        <span>Genre</span>
        <input type="genre" value={genre} name="genre" placeholder="Genre of the book" onChange={this.handleChange} />
        <span>Price</span>
        <input type="number" value={price} name="price" min="0" placeholder="Price in euros" onChange={this.handleChange} />
        <button type="submit" disabled={!valid} className={closeBtn}>Save</button>
      </form>
    );
  }
}

AddBookForm.propTypes = {
  closeModal: PropTypes.instanceOf(Function).isRequired,
  addBook: PropTypes.instanceOf(Function).isRequired,
};
