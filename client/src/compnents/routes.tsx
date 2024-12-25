import { createBrowserRouter } from 'react-router-dom';


export const pages = [
  {
    path: 'types',
    element: <types />,
    display: 'attack-types',
  },
  {
    path: 'highest',
    element: <highest />,
    display: 'highest-casualty-regions',
  },
  {
    path: 'trends',
    element: <trends />,
    display: 'incident-trends',
  },
  {
    path: 'top',
    element: <top />,
    display: 'top-groups',
  },
  {
    path: 'year',
    element: <year />,
    display: 'groups-by-year',
  },
  {
    path: 'deadliest',
    element: <deadliest />,
    display: 'deadliest-regions',
  }
];

export const routes = createBrowserRouter(pages);

