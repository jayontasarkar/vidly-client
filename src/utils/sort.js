import _ from "lodash";

export function sort(items, path, order = "asc") {
  const sorted = _.orderBy(items, [path], [order]);
  return sorted;
}
