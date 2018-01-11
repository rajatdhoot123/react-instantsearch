import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { pick } from 'lodash';
import translatable from '../core/translatable';
import List from './List';
import Link from './Link';
import Highlight from '../widgets/Highlight';
import createClassNames from './createClassNames';

const cx = createClassNames('Menu');

class Menu extends Component {
  static propTypes = {
    translate: PropTypes.func.isRequired,
    refine: PropTypes.func.isRequired,
    searchForItems: PropTypes.func.isRequired,
    withSearchBox: PropTypes.bool,
    createURL: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
        isRefined: PropTypes.bool.isRequired,
      })
    ),
    isFromSearch: PropTypes.bool.isRequired,
    canRefine: PropTypes.bool.isRequired,
    showMore: PropTypes.bool,
    limitMin: PropTypes.number,
    limitMax: PropTypes.number,
    transformItems: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  renderItem = (item, resetQuery) => {
    const { createURL } = this.props;
    const label = this.props.isFromSearch ? (
      <Highlight attributeName="label" hit={item} />
    ) : (
      item.label
    );
    return (
      <Link
        className={cx('link')}
        onClick={() => this.selectItem(item, resetQuery)}
        href={createURL(item.value)}
      >
        <span className={cx('label')}>{label}</span>{' '}
        <span className={cx('count')}>{item.count}</span>
      </Link>
    );
  };

  selectItem = (item, resetQuery) => {
    resetQuery();
    this.props.refine(item.value);
  };

  render() {
    return (
      <List
        renderItem={this.renderItem}
        selectItem={this.selectItem}
        cx={cx}
        {...pick(this.props, [
          'translate',
          'items',
          'showMore',
          'limitMin',
          'limitMax',
          'isFromSearch',
          'searchForItems',
          'withSearchBox',
          'canRefine',
          'className',
        ])}
      />
    );
  }
}

export default translatable({
  showMore: extended => (extended ? 'Show less' : 'Show more'),
  noResults: 'No results',
  submit: null,
  reset: null,
  resetTitle: 'Clear the search query.',
  submitTitle: 'Submit your search query.',
  placeholder: 'Search here…',
})(Menu);
