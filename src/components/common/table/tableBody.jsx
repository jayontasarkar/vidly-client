import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.length > 0 &&
          data.map((item, index) => (
            <tr key={index}>
              {columns.map((column, index) => (
                <td key={index}>{this.renderCell(item, column)}</td>
              ))}
            </tr>
          ))}

        {data.length === 0 && (
          <tr>
            <td colSpan={columns.length}>no items found in the database</td>
          </tr>
        )}
      </tbody>
    );
  }
}

export default TableBody;
