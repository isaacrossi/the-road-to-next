import { closest } from "fastest-levenshtein";

// export const getActivePath = (path: string, paths: string[]) => {
//   const activePath = closest(path, paths);

//   return activePath;
// };

// instead of returning the string of the active path we want to return the index
// We will provide this active index to the sidebar item and if the active index is the current
// side bar item we will highlight it
export const getActivePath = (
  path: string,
  paths: string[],
  ignorePaths?: string[],
) => {
  // the algorithm gives us the closest path
  const closestPath = closest(path, paths.concat(ignorePaths || []));
  const index = paths.indexOf(closestPath);
  // however we rename it to active to better match our use case
  return { active: closestPath, activeIndex: index };
};
