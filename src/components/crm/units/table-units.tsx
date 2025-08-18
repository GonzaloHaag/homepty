import { getUnits } from "@/actions/unit";
import { formatMoney } from "@/utils/format-money";

export const TableUnits = async () => {
  const response = await getUnits({ byUserId:true });
  if (!response.ok || !response.data) {
    console.error(response.message);
    return;
  }

  const { unidades } = response.data;
  return (
    <>
      {unidades.map((unidad) => (
        <tr key={unidad.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {unidad.nombre_unidad}
          </th>
          <td className="px-6 py-4">{unidad.tipo_unidad}</td>
          <td className="px-6 py-4">{unidad.direccion_unidad}</td>
          <td className="px-6 py-4">{unidad.estados?.nombre_estado}</td>
          <td className="px-6 py-4">{unidad.ciudades?.nombre_ciudad}</td>
          <td className="px-6 py-4">{formatMoney(unidad.precio_unidad.toString())}</td>
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
