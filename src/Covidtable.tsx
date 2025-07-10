// src/BreweryTable.tsx
import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import "datatables.net-dt/css/dataTables.dataTables.css";
import 'datatables.net';

interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  city: string;
  state: string;
  country: string;
}

const BreweryTable: React.FC = () => {
  const tableRef = useRef<HTMLTableElement | null>(null);
  const [data, setData] = useState<Brewery[]>([]);

  useEffect(() => {
    fetch('https://api.openbrewerydb.org/v1/breweries?per_page=150')
      .then(res => res.json())
      .then((breweries: Brewery[]) => setData(breweries))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  useEffect(() => {
    if (data.length > 0 && tableRef.current) {
      $(tableRef.current).DataTable();
    }
  }, [data]);

  return (
    <div className="container">
      <h2>Brewery List</h2>
      <table ref={tableRef} className="display" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {data.map(brewery => (
            <tr key={brewery.id}>
              <td>{brewery.name}</td>
              <td>{brewery.brewery_type}</td>
              <td>{brewery.city}</td>
              <td>{brewery.state}</td>
              <td>{brewery.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BreweryTable;
