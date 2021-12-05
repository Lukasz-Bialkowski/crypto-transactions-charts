import { shallowEqual } from "react-redux";

import { Table } from "../../../../components/Table";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { Currency } from "../../../../types/enums/Currency";
import { CurrencyRatesRow } from "../CurrencyRatesRow";

const CurrencyRatesTable = () => {
  const [rates, ratesLoading, ratesError] = useTypedSelector(
    ({ rates: { rates, loading, error } }) => [rates, loading, error],
    shallowEqual
  );

  return (
    <section>
      <h2>Currency rates (€)</h2>
      <Table
        error={ratesError}
        loading={ratesLoading}
        items={Object.entries(rates).map(([currency, rate]) => (
          <CurrencyRatesRow
            key={currency}
            currency={currency as Currency}
            rate={rate}
          />
        ))}
        header={
          <tr>
            <th>Currency</th>
            <th>Eur rate</th>
          </tr>
        }
      />
    </section>
  );
};

export { CurrencyRatesTable };
