const updateSearchParam = (param, value) => {
  if ("URLSearchParams" in window) {
    const searchParams = new URLSearchParams(window.location.search);
    if (value.length === 0) {
      searchParams.delete(param);
      let newRelativePathQuery;
      if ([...searchParams.keys()].length === 0) {
        newRelativePathQuery = window.location.pathname;
      } else {
        newRelativePathQuery =
          window.location.pathname + "?" + searchParams.toString();
      }
      history.pushState(null, "", newRelativePathQuery);
    } else {
      searchParams.set(param, value);
      const newRelativePathQuery =
        window.location.pathname + "?" + searchParams.toString();
      history.pushState(null, "", newRelativePathQuery);
    }
  }
};

export default updateSearchParam;
