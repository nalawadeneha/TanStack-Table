import DataTable from "./components/DataTable";
import { people } from "./data/people";
import { peopleColumns } from "./columns/peopleColumns";

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: "32px auto", padding: "0 16px" }}>
      <h1 style={{ marginBottom: 16 , color:"black", textAlign:"center"}}>Table</h1>
      <DataTable data={people} columns={peopleColumns} pageSize={5} />
    </div>
  );
}
