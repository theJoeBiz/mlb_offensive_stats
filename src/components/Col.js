import React, { Component } from 'react';
import classnames from 'classnames';

class Col extends Component {
  render() {
    let { sm, md, lg, ...props } = this.props;

    let className = classnames(
      'col',
      { 's12': !sm },
      { [`s${12/sm}`]: sm },
      { [`m${12/md}`]: md },
      { [`l${12/lg}`]: lg }
    );

    return (
      <div {...props} className={className}>{this.props.children}</div>
    );
  }
}

export default Col;