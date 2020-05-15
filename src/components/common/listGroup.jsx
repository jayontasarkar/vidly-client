/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

const ListGroup = ({ items, text, value, onItemSelect, selectedItem }) => {
  return (
    <div className="list-group">
      {items.map((item, index) => (
        <a
          href="#"
          className={
            selectedItem && selectedItem._id === item._id
              ? "list-group-item list-group-item-action active disabled"
              : "list-group-item list-group-item-action"
          }
          key={index}
          onClick={(e) => onItemSelect(e, item)}
        >
          {item[text]}
        </a>
      ))}
    </div>
  );
};

ListGroup.defaultProps = {
  text: "name",
  value: "_id",
};

export default ListGroup;
