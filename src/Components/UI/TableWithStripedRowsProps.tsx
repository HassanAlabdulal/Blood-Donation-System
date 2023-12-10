import { Card, Typography } from "@material-tailwind/react";

interface TableWithStripedRowsProps {
  headers: string[];
  rows: Array<Record<string, string>>;
}

export default function TableWithStripedRows({
  headers,
  rows,
}: TableWithStripedRowsProps) {
  return (
    <Card
      className="w-full h-full overflow-scroll"
      // children={undefined}
      placeholder={undefined}
    >
      <table className="w-full text-center table-auto min-w-max">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="p-4 bg-black border-b border-blue-gray-100"
              >
                <Typography
                  variant="small"
                  color="white"
                  className="font-bold leading-none"
                  // children={undefined}
                  placeholder={undefined}
                >
                  {header}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={index}
              className="transition-all duration-200 even:bg-blue-gray-50/50 hover:bg-blue-gray-100"
            >
              {Object.values(row).map((value, cellIndex) => (
                <td key={cellIndex} className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    // children={undefined}
                    placeholder={undefined}
                  >
                    {value}
                  </Typography>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
