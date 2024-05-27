import { GetMultiQueryParameters, QueryFilter } from '@/types/api-types.ts'

export function getDefaultParams(tableOptions): GetMultiQueryParameters {
  const { page, itemsPerPage, sortBy } = tableOptions
  const params: GetMultiQueryParameters = {
    page: page,
    per_page: itemsPerPage,
    sort: null,
    is_desc: null,
    use_or: false,
    filters: null
  }
  if (sortBy.length > 0) {
    params.sort = sortBy[0].key
    params.is_desc = sortBy[0].order == 'desc' ? true : false
  }
  return params
}

export function buildFilters(keys: Array<string>, operator: string, term: string | number): string {
  const filters: Array<QueryFilter> = []
  if (operator === ':') {
    term = `%${term}%`
  }
  keys.forEach((k) => {
    filters.push(new QueryFilter(k, operator, term))
  })
  return JSON.stringify(filters)
}
