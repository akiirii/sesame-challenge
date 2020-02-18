import React from 'react';
import PropTypes from 'prop-types';
import Option from './option';
import {
  KEY_DOWN, KEY_UP, KEY_ENTER, COLORS,
} from './constants';
import {
  List,
  Container,
  InputContainer,
  Input,
  Button,
} from './style';

export class TypeaheadComponent extends React.Component {
  state = {
    suggestions: [],
    marked: '',
    query: '',
  };

  componentDidMount() {
    const { query } = this.props;
    this.setState({ query });
  }

  parseQuery = (query = '') => query.replace(/ /g, '').toLowerCase();

  filter = (query) => {
    const { dataSource } = this.props;
    const uniqueData = dataSource.filter((value, index, self) => self.indexOf(value) === index);
    return uniqueData.filter((option) => this.parseQuery(option).includes(this.parseQuery(query)));
  };

  onClick = (value) => {
    const { onChange } = this.props;
    this.setState({ query: value, suggestions: [], marked: '' });
    onChange(value);
  };

  onHover = (value) => this.setState({ marked: value });

  markNeighbor = (step) => {
    const { suggestions, marked } = this.state;
    const index = suggestions.indexOf(marked);
    const newIndex = Math.max(0, Math.min(suggestions.length - 1, index + step));
    this.setState({ marked: suggestions[newIndex] || '' });
  };

  onKeyUp = (event) => {
    const { marked, query } = this.state;
    switch (event.keyCode) {
      case KEY_DOWN:
        this.markNeighbor(1);
        break;
      case KEY_UP:
        this.markNeighbor(-1);
        break;
      case KEY_ENTER:
        this.onClick(marked || query);
        break;
      default:
        break;
    }
  };

  onChange = (event) => {
    const { onChange } = this.props;
    this.setState({ query: event.target.value, suggestions: this.filter(event.target.value), marked: '' });
    onChange(event.target.value);
  };

  render() {
    const { query, suggestions, marked } = this.state;
    const isSearchEmpty = !suggestions || !suggestions.length;

    return (
      <Container>
        <InputContainer>
          <Input
            value={marked || query}
            style={{ color: marked && COLORS.secondaryFont }}
            onChange={this.onChange}
            onKeyUp={this.onKeyUp}
          />
          {!!query.length && <Button onClick={() => this.onClick('')}>x</Button>}
        </InputContainer>

        {!isSearchEmpty && (
        <List>
          {suggestions.map((option) => (
            <Option
              key={option}
              onClick={this.onClick}
              onHover={this.onHover}
              value={option}
              marked={marked}
              query={query}
            />
          ))}
        </List>
        )}

      </Container>
    );
  }
}

TypeaheadComponent.defaultProps = {
  query: '',
};

TypeaheadComponent.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.string).isRequired,
  query: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};


export default TypeaheadComponent;
