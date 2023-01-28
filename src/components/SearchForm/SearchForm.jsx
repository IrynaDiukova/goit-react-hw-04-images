import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Button, ButtonLabel, Input } from './SearchForm.styled';

const SearchForm = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    
    const notmalizedSearch = search.trim();

    onSubmit(notmalizedSearch);
    setSearch(notmalizedSearch);

    if (!notmalizedSearch) {
      toast.warning('Please, enter your search query.')
    }
  };

  const handleInputChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'search':
        setSearch(value);
        break;

        default:
          throw new Error('Unsupported input name');
    }
 
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Button type="submit">
        <ButtonLabel>Search</ButtonLabel>
      </Button>

      <Input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        name="search"
        value={search}
        onChange={handleInputChange}
      />
    </Form>
  );
};

SearchForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;