import React, { useEffect, useState } from 'react';
import TreeView from 'components/TreeView';
import './Main.scss';

MainPage.propTypes = {};

function MainPage(props) {

  const [ isChange, setIsChange ] = useState(false);
  const [ isChange2, setIsChange2 ] = useState(false);

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

  // useEffect(() => {
  //   console.log('Component did mount');
  // }, []); // Dependencies 


  // useEffect(() => {
  //   console.log('Component did update'); 
  // })

  // useEffect(()=> {
  //   console.log('Is Change render');
  // }, [isChange])

  const trees = menus.map((menu) => {
    return <TreeView key={menu.id} node={menu}/>;
  });

  return (
    <div className="home">
      <h1>Welcome main page</h1>
      <h2>Tree node example</h2>
      {trees}

      <div className="btn-group" style={{ marginTop: 10 }}>
        <button className="button" color="success" onClick={()=> setIsChange(!isChange)}>Change 1</button>
        <button className="button" color="success" onClick={()=> setIsChange2(!isChange2)}>Change 2</button>
      </div>

      <span> {isChange}</span>
    </div>
  )
}

export default MainPage;

