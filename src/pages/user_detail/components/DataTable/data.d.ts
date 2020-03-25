export interface RegionTableItemType {}

export interface DataTableSourceProps {
  region?: object[];
  track?: object[];
  commuting?: object[];
}

export interface DataTableProps {
  loading?: boolean;
  datasource: DataTableSourceProps;
}
