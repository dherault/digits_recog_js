import React from 'react';
import { Link } from 'react-router';

export default () => <div className='not_found'>
  Page not found!
  <Link to='/' alt='Go home'>Main page</Link>
</div>;
