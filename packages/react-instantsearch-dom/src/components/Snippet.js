import React from 'react';
import createClassNames from '../core/createClassNames';
import Highlighter from './Highlighter';

const cx = createClassNames('Snippet');

const Snippet = props => (
  <Highlighter {...props} highlightProperty="_snippetResult" cx={cx} />
);

export default Snippet;