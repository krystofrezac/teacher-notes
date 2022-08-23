import { ReactNode } from 'react';

import { CardProps } from './Card.types';
import { TableActions, TableDefaultRowData, TableProps } from './Table.types';

export interface CardTableProps<RowData extends TableDefaultRowData>
  extends Omit<CardProps, 'noPadding' | 'children' | 'loading'>,
    Omit<TableProps<RowData>, 'actions' | 'hideHeader' | 'loading'> {
  rowActions: TableActions<RowData>;
  hideTableHeader?: boolean;
  header?: ReactNode;
  cardLoading?: boolean;
  tableLoading?: boolean;
}
