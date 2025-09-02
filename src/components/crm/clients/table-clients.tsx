import { ClientEntity } from "@/entities/client";

interface TableClientsProps {
  isLoading: boolean;
  isError: boolean;
  clientes: ClientEntity[];
}
export const TableClients = ({
  isLoading,
  isError,
  clientes,
}: TableClientsProps) => {
  if (isLoading) {
    return (
      <tr>
        <td
          colSpan={6}
          className="w-full text-center text-muted-foreground py-4"
        >
          Cargando datos...
        </td>
      </tr>
    );
  }
  if(isError) {
     return (
      <tr>
        <td
          colSpan={6}
          className="w-full text-center text-red-600 py-4"
        >
          Error al cargar los datos
        </td>
      </tr>
    );
  }
  return (
    <>
      {clientes.length > 0 ? (
        clientes.map((client) => (
          <tr
            key={client.id_cliente}
            className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
          >
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {client.nombre_cliente}
            </th>
            <td className="px-6 py-4">{client.email_cliente ?? "Sin email"}</td>
            <td className="px-6 py-4">{client.telefono_cliente}</td>
            <td className="px-6 py-4">{client.dni_cif_cliente}</td>
            <td className="px-6 py-4">{new Date(client.created_at.toString()).toLocaleDateString()}</td>
            <td className="px-6 py-4">
              <a
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Edit
              </a>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={6}
            className="w-full text-center text-muted-foreground py-4"
          >
            No se encontraron resultados
          </td>
        </tr>
      )}
    </>
  );
};
