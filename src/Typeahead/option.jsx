import React from 'react';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';
import { COLORS } from './constants';
import { Li, style } from './style';

function Option({
  value, query, onClick, onHover, marked,
}) {
  const isMarked = marked === value;
  return (
    <Li
      onClick={() => onClick(value)}
      onMouseEnter={() => onHover(value)}
      onMouseLeave={() => onHover('')}
      style={{ background: isMarked ? COLORS.greyLight : '' }}
    >
      <Highlighter
        highlightStyle={style.highlightStyle}
        searchWords={[query]}
        textToHighlight={value}
      />
    </Li>
  );
}

Option.defaultProps = {
  query: '',
  marked: '',
};

Option.propTypes = {
  onClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  query: PropTypes.string,
  marked: PropTypes.string,
};


export default Option;
