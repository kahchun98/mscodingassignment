import React from 'react';
import { useTable, usePagination , useSortBy} from 'react-table';

export default function Table({columns, data,} : {columns:any, data:any}) {
    React.useEffect(() => {
      }, [data]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
      } = useTable({ columns, data, initialState: {pageIndex: 0 , pageSize: 5}, }, useSortBy, usePagination)
    
    return (
    <div>
        <table {...getTableProps()} 
            style={{padding: '20px'}}>
            <thead style={{ background: '#ebeded' , height: '40px'}}>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                    <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{
                        color: '#909ea3',
                        padding: '10px',
                        width: '140px'
                    }}
                    >
                    {column.render('Header')}
                    <span>
                        {column.isSorted
                        ? column.isSortedDesc
                            ? ' ⬆'
                            : ' ⬇'
                        : ''}
                    </span>
                    </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                    <tr {...row.getRowProps()}
                        style={{
                            backgroundColor: 'white',
                            textAlign: 'center',
                            padding: '10px',
                            height: '50px'
                        }}>
                        {row.cells.map(cell => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                    </tr>
                    )
                })}
            </tbody>
        </table>
        <div style={{textAlign:'right'}}>
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
            </button>{' '}
            <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
            </button>{' '}
            <span>
                Page{' '}
                <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(page)
                    }}
                    style={{ width: '20px' , marginRight:'10px'}}
                />
                <strong>
                 of {pageOptions.length}
                </strong>{' '}
            </span>
        </div>
    </div>
        
    )
}