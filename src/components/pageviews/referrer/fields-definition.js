export default {
  table1Fields: [
    {
      name: 'id',
      title: 'segment',
      sortField: 'id'
    },
    {
      name: 'count',
      title: 'count'
    },
    {
      name: 'rel_percent',
      title: '%'
    },
    {
      name: 'diff',
      title: 'change'
    }
  ],
  table2Fields: [
    {
      name: 'id',
      title: 'url',
      sortField: 'id'
    },
    {
      name: 'count',
      title: 'count'
    },
    {
      name: 'rel_percent',
      title: '%'
    },
    {
      name: 'diff',
      title: 'change'
    }
  ],
  sortFunctions: {
    'name': function (item1, item2) {
      return item1 >= item2 ? 1 : -1
    }
  }
}
