import React from 'react';
import TreeView from 'components/TreeView';
import './Main.scss';

function MainPage(props) {
  const menus = [
    {
      id: 1,
      name: 'menu 1',
      children: [
        {
          id: 1,
          name: 'sub menu 1',
          children: [
            {
              id: 1,
              name: 'sub menu 1_1',
            }
          ]
        }
      ]
    }, {
      id: 2,
      name: 'menu 2',
      children: [
        {
          id: 1,
          name: 'sub menu 2',
        }
      ]
    }
  ];

  const trees = menus.map((menu) => {
    return <TreeView key={menu.id} node={menu}/>;
  });

  return (
    <div className="home">
      <h1>Welcome main page</h1>
      <h2>Tree node example</h2>
      {trees.map((node) => node )}
    </div>
  )
}

MainPage.propTypes = {

}

export default MainPage

