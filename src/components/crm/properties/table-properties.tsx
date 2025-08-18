import { getProperties } from "@/actions/property";

export const TableProperties = async () => {
  const response = await getProperties({ byUserId:true });
  if (!response.ok || !response.data) {
    console.error(response.message);
    return;
  }

  const { propiedades } = response.data;
  return (
    <>
      {propiedades.map((propiedad) => (
        <tr key={propiedad.id_propiedad} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {propiedad.titulo_propiedad}
          </th>
          <td className="px-6 py-4">{propiedad.tipo_propiedad}</td>
          <td className="px-6 py-4">{propiedad.direccion_propiedad}</td>
          <td className="px-6 py-4">{propiedad.estados.nombre_estado}</td>
          <td className="px-6 py-4">{propiedad.ciudades.nombre_ciudad}</td>
          <td className="px-6 py-4">
            <a
              href="#"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Edit
            </a>
          </td>
        </tr>
      ))}
    </>
  );
};
