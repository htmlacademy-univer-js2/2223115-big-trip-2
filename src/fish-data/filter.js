import { filter } from "../utils";

const generateFilter = (points) => Object.entries(filter).map(
    ([filterName, filterPoint]) => ({
      name: filterName,
      count: filterPoint(points).length,
    }),
  );

export default generateFilter;