const categoryFilterBuilder = (value) => {
  return `categories.name = '${value}'`;
};

const makeProductQueryBuilders = (params) => {
  const builderSet = {
    category: categoryFilterBuilder,
  };

  const whereClauses = Object.entries(params).map(([key, value]) =>
    builderSet[key](value)
  );

  return whereClauses.length !== 0 ? `WHERE ${whereClauses.join(' AND ')}` : ``;
};

module.exports = { makeProductQueryBuilders };
