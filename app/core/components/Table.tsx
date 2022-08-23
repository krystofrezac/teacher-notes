import React from 'react';

import Flex from './Flex';
import Overlay, { OverlayContainer } from './Overlay';
import Spinner from './Spinner';
import { TableDefaultRowData, TableProps } from './Table.types';

const Table = <RowData extends TableDefaultRowData>(
  props: TableProps<RowData>,
): React.ReactElement => {
  return (
    <OverlayContainer>
      <Overlay open={!!props.loading}>
        <Spinner hidden={!props.loading} size='lg' />
      </Overlay>
      <table className='table w-full'>
        {!props.hideHeader && (
          <thead>
            <tr>
              {props.columns.map(column => (
                <th
                  key={column.key ?? column.field.toString()}
                  className='px-8'
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {props.data?.map(row => (
            <tr key={row.id}>
              {props.columns.map(column => (
                <td key={column.key ?? column.field.toString()}>
                  {column.render && column.render(row)}
                  {!column.render && column.field && row[column.field]}
                </td>
              ))}
              {props.actions && (
                <td>
                  <Flex horizontal='end' gap='1'>
                    {props.actions?.(row)}
                  </Flex>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </OverlayContainer>
  );
};

export default Table;
