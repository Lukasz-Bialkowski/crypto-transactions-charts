import { TableProps } from "./TableProps";

import "./Table.css";

const Table = ({ status, items, header }: TableProps) => {
  const loader = <td colSpan={100}>Loading...</td>;
  const errorState = <td colSpan={100}>Error occured. Try again later.</td>;
  const emptyState = <td colSpan={100}>No rows to display.</td>;

  const renderBody = () => {
    let content;

    if (status === "loading") {
      content = loader;
    } else if (status === "failed") {
      content = errorState;
    } else if (status === "success" && !items.length) {
      content = emptyState;
    } else if (status === "success") {
      return items;
    }

    return <tr>{content}</tr>;
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
