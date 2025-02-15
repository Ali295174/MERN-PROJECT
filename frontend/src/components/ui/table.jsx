import React from 'react';

export const Table = ({ children }) => (
  <table className="min-w-full table-auto">
    {children}
  </table>
);

export const TableHeader = ({ children }) => (
  <thead className="bg-gray-200">
    <tr>{children}</tr>
  </thead>
);

export const TableRow = ({ children }) => <tr>{children}</tr>;

export const TableHead = ({ children }) => (
  <th className="px-4 py-2 text-left">{children}</th>
);

export const TableCell = ({ children }) => (
  <td className="px-4 py-2">{children}</td>
);

export const TableBody = ({ children }) => <tbody>{children}</tbody>;