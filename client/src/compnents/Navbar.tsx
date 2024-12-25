import { Hamburger, NavDrawer, NavItem } from '@fluentui/react-nav-preview';
import React, { useState } from 'react';
import { pages } from './routes';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const openBtn = (
    <Hamburger
      style={{ padding: '1em 2em' }}
      onClick={() => setIsOpen(!isOpen)}
    />
  );

  return (
    <>
      {!isOpen && openBtn}
      <NavDrawer open={isOpen} size="medium">
        {openBtn}
        {pages.map((page) => (
          <NavItem
            key={page.path}
            href={'/' + page.path}
            as="a"
            value={page.path}
          >
            {page.display}
          </NavItem>
        ))}
      </NavDrawer>
    </>
  );
}
