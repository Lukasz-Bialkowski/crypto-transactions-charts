import { Table } from "../../../../components/Table";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { Currency } from "../../../../types/enums/Currency";
import { CurrencyRatesRow } from "../CurrencyRatesRow";

const CurrencyRatesTable = () => {
  const rates = useTypedSelector(({ rates: { rates } }) => rates);
  const status = useTypedSelector(({ rates: { status } }) => status);

  return (
    <section>
      <h2>Currency rates (€)</h2>
      <Table
        status={status}
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
