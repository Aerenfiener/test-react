import React from 'react';
import AsyncComponent from './../../global/AsyncComponent';

const loader = (cb) => {
    require.ensure([], (require) => {
        cb(require('./FinishForm'))
    });
};

export default (props) =>
    <AsyncComponent {...props} loader={loader}/>