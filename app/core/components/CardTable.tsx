import React from 'react';

import Card from './Card';
import { CardTableProps } from './CardTable.types';
import Spacer from './Spacer';
import Table from './Table';
import { TableDefaultRowData } from './Table.types';

const CardTable = <RowData extends TableDefaultRowData>(
  props: CardTableProps<RowData>,
): React.ReactElement => {
  return (
    <Card noPadding noGap {...props} loading={props.cardLoading}>
      {props.header && <Spacer all='1'>{props.header}</Spacer>}
      <Table
        {...props}
        actions={props.rowActions}
        hideHeader={props.hideTableHeader}
        loading={props.tableLoading}
      />
    </Card>
  );
};

export default CardTable;
