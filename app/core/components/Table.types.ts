import React, { Key, ReactElement } from 'react';

import { IconProps } from './Icon.types';

type FieldOrKey<RowData> =
  | {
      field: keyof RowData;
      render?: undefined;
      key?: undefined;
    }
  | {
      field?: undefined;
      render?: (row: RowData) => React.ReactNode;
      key: Key;
    };

type Column<RowData> = {
  label?: string;
} & FieldOrKey<RowData>;

export type TableDefaultRowData = Record<string, any> & {
  id: number | string;
};

export type TableActions<RowData> = (row: RowData) => ReactElement[];

export interface TableActionOption<RowData> {
  key: React.Key;
  icon?: React.ReactElement;
  iconProps?: Omit<IconProps, 'children'>;
  content: React.ReactNode;
  onClick?: (row: RowData) => void;
}

export interface TableProps<RowData extends TableDefaultRowData> {
  columns: Column<RowData>[];
  data: RowData[] | undefined;
  actions?: TableActions<RowData>;
  hideHeader?: boolean;
  loading?: boolean;
}
