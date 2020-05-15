import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };

  displaySortableIcon = (column) => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc")
      return <i className="pl-1 fa fa-sort-asc"></i>;
    return <i className="pl-1 fa fa-sort-desc"></i>;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column, index) => (
            <th scope="col" key={index}>
              <span
                style={column.sortable ? { cursor: "pointer" } : {}}
                onClick={
                  column.sortable ? () => this.raiseSort(column.path) : null
                }
              >
                {column.label || ""}
                {this.displaySortableIcon(column)}
              </span>
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
