import React, { useState } from 'react';
import './TreeView.scss';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
function TreeView({node}) {

  const [ collage, setCollage ] = useState(false);

  const sub = node?.children?.map(function(child) {
    return <TreeView key={child.id} node={child} />;
  }) || null;

  return (
    <>
      {sub ? (
        <div className="node tree-node">
          <div className="content pointer" onClick={()=> setCollage(!collage)}>
            <span>{node.name}</span>
            <span>
              {collage ? <ArrowDownwardIcon /> : <ArrowRightIcon />}
            </span>
          </div>
          <div className={`sub-tree ${collage ? 'show' : 'hide'}`}>
            {sub}
          </div>
        </div>
      ) : (
        <div className="node">
          <div className="content">
            <span>{node.name}</span>
          </div>
        </div>
      )}
    </>
  )
}

TreeView.propTypes = {};

export default TreeView;

