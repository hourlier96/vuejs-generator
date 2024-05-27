type StatusCode = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 422 | 500
type SnackLocation =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top right'
  | 'top left'
  | 'bottom right'
  | 'bottom left'
type SnackMessageMapping = Partial<Record<StatusCode, string>>

export class SnackBar {
  show?: boolean
  location?: SnackLocation
  mapping?: SnackMessageMapping // Custom mapping for snackbar text

  constructor(
    show: boolean = true,
    location: SnackLocation = 'top right',
    mapping: SnackMessageMapping = null
  ) {
    this.show = show
    this.location = location
    this.mapping = mapping
  }
}

export class QueryFilter {
  field: string
  operator: string
  value: any

  constructor(field: string, operator: string, value: any) {
    this.field = field
    this.operator = operator
    this.value = value
  }
}

export class GetMultiQueryParameters {
  page: number
  per_page: number
  sort: string
  is_desc: boolean
  use_or: boolean
  filters: string // TODO: Array<QueryFilter>

  constructor(
    page: number,
    per_page: number,
    sort: string,
    is_desc: boolean,
    use_or: boolean,
    filters: string
  ) {
    this.page = page
    this.per_page = per_page
    this.sort = sort
    this.is_desc = is_desc
    this.use_or = use_or
    this.filters = filters
  }
}

export class PaginatedResult<T> {
  items: Array<T>
  total: number

  constructor(items: Array<T> = [], total: number = 0) {
    this.items = items
    this.total = total
  }
}
