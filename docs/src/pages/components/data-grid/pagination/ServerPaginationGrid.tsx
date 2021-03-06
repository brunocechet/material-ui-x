import * as React from 'react';
import { RowsProp, DataGrid } from '@material-ui/data-grid';
import { useDemoData, GridData } from '@material-ui/x-grid-data-generator';

function loadServerRows(page: number, data: GridData): Promise<any> {
  return new Promise<any>((resolve) => {
    setTimeout(() => {
      resolve(data.rows.slice((page - 1) * 5, page * 5));
    }, Math.random() * 500 + 100); // simulate network latency
  });
}

export default function ServerPaginationGrid() {
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 100,
    maxColumns: 6,
  });
  const [page, setPage] = React.useState(1);
  const [rows, setRows] = React.useState<RowsProp>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const newRows = await loadServerRows(page, data);

      if (!active) {
        return;
      }

      setRows(newRows);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [page, data]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={data.columns}
        pagination
        pageSize={5}
        rowCount={100}
        paginationMode="server"
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
}
