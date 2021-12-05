import { TableProps } from "./TableProps";

import "./Table.css";

const Table = ({ error, loading, items, header }: TableProps) => {
  const renderBody = () => {
    if (loading) {
      return (
        <tr>
          <td colSpan={100}>Loading...</td>
        </tr>
      );
    } else if (error) {
      return (
        <tr>
          <td colSpan={100}>Error...</td>
        </tr>
      );
    } else if (!items.length) {
      return (
        <tr>
          <td colSpan={100}>No entries...</td>
        </tr>
      );
    }
    return items;
  };

  return (
    <table>
      <tbody>
        {header}
        {renderBody()}
      </tbody>
    </table>
  );
};

export { Table };
