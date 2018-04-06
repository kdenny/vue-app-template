export default {
  table1Fields: [
    {
      name: 'id',
      title: 'country',
      sortField: 'id'
    },
    {
      name: 'count',
      title: 'count'
    },
    {
      name: 'rel_percent',
      title: 'rel_percent'
    },
    {
      name: 'diff',
      title: 'change'
    }
  ],
  table2Fields: [
    {
      name: 'id',
      title: 'state',
      sortField: 'id'
    },
    {
      name: 'count',
      title: 'count'
    },
    {
      name: 'rel_percent',
      title: 'rel_percent'
    },
    {
      name: 'diff',
      title: 'change'
    }
  ],
  table3Fields: [
    {
      name: 'id',
      title: 'city',
      sortField: 'id'
    },
    {
      name: 'count',
      title: 'count'
    },
    {
      name: 'rel_percent',
      title: 'rel_percent'
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
