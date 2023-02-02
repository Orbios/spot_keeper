import {Link, useLocation} from 'react-router-dom';

import AppIcon from 'components/common/AppIcon';

import * as styled from './Navigation.styled';

type navItem = 'home' | 'search' | 'add_list';

interface NavItem {
  id: navItem;
  title: string;
  path: string;
  icon: string;
  addGap?: boolean;
}

const navList: NavItem[] = [
  // {id: 'home', title: 'Home', path: '/', icon: 'home'},
  {id: 'search', title: 'Search', path: '/search', icon: 'search', addGap: true},
  {id: 'add_list', title: 'Add List', path: '/list', icon: 'plus'}
];

interface Props {
  addNewList: () => void;
}

function Navigation({addNewList}: Props) {
  const location = useLocation();

  const pathname = location.pathname;

  return (
    <styled.navigation>
      {navList.map(item => {
        const id = item.id;
        const path = item.path;

        if (id === 'add_list') {
          return (
            <styled.navigationItem key={id} active={path === pathname} onClick={addNewList}>
              <AppIcon icon={item.icon} />

              <styled.title>{item.title}</styled.title>
            </styled.navigationItem>
          );
        }

        return (
          <styled.navigationItem key={id} as={Link} to={path} active={path === pathname} gap={item.addGap}>
            <AppIcon icon={item.icon} />

            <styled.title>{item.title}</styled.title>
          </styled.navigationItem>
        );
      })}
    </styled.navigation>
  );
}

export default Navigation;
