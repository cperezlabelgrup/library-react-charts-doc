import React, { useState } from 'react';

interface SubDetail {
  name: string;
  type: string;
  description?: string;
}

interface TypeDetail {
  name: string;
  type: string;
  description?: string;
  subDetails?: SubDetail[];
}


const PropsTable: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  const toggleSubDropdown = (name: string) => {
    if (openSubDropdown === name) {
      setOpenSubDropdown(null);
    } else {
      setOpenSubDropdown(name);
    }
  };

  const props: { name: string; description: string; type: string; details?: TypeDetail[] }[] = [
    {
      name: 'lineSets',
      description: 'Conjunto de líneas para graficar',
      type: 'LineSet[]',
      details: [
        { 
          name: 'data', 
          type: 'DataPoint[]', 
          description: 'Datos de los puntos de la línea',
          subDetails: [
            { name: 'x', type: 'number', description: 'Coordenada x del punto' },
            { name: 'y', type: 'number', description: 'Coordenada y del punto' },
            { name: 'label', type: 'string', description: 'Etiqueta opcional del punto' },
            { name: 'tooltip_data', type: 'any', description: 'Datos adicionales para tooltip' },
          ]
        },
        { name: 'strokeColor', type: 'string', description: 'Color del trazo de la línea' },
        { name: 'showPoints', type: 'boolean', description: 'Si mostrar puntos en la línea' },
        { name: 'label', type: 'string', description: 'Etiqueta de la línea' },
        { name: 'dashedParameter', type: 'number', description: 'Parámetro para línea discontinua' },
        { name: 'backgroundColorLine', type: 'string', description: 'Color de fondo de la línea' },
      ],
    },
    { name: 'showTooltip', description: 'Si mostrar tooltips', type: 'boolean' },
    {
        name: 'customToolTip', description: 'Función para tooltip personalizado', type: 'function: (data: CustomToolTipData) => JSX.Element', details: [
            { name: 'data', type: 'CustomToolTipData', description: 'Datos del tooltip', subDetails: [
                { name: 'value', type: '{ x: number; y: number; }', description: 'Valor del punto' },
                { name: 'label', type: 'string', description: 'Etiqueta de la línea' },
                { name: 'xLabel', type: 'string', description: 'Etiqueta del eje x' }
            ]}
            ]
    },
    {
        name : 'xAxisLabels', description: 'Etiquetas del eje x', type: 'string[]'
    },
    {
        name : 'lineToShowPointInfo', description: 'Indice de la línea a mostrar información', type: 'number'

    },
    {
      name : 'horizontalGuides', description: 'Guías horizontales', type: 'HorizontalGuide', details: [{
        name: 'count', type: 'number', description: 'Cantidad de guías horizontales'
      },
      {
        name: 'stroke', type: 'number', description: 'Grosor de la guía'
      },
      {
        name: 'color', type: 'string', description: 'Color de la guía'
      },
      {
        name: 'dashed', type: 'boolean', description: 'Si la guía es discontinua'
      
      }
    ]
    },
    {
        name : 'verticalGuides', description: 'Guías verticales', type: 'boolean'
    },
    {
        name : 'hideXlabels', description: 'Si mostrar eje x', type: 'boolean'
    },
    {
        name : 'hideYlabels', description: 'Si mostrar eje y', type: 'boolean'
    },
    {
        name : 'showTooltip', description: 'Si mostrar tooltips', type: 'boolean'
    },
    {
        name : 'showAllPoints', description: 'Si mostrar todos los puntos', type: 'boolean'
    }, {
        name : 'fontSize', description: 'Tamaño de fuente', type: 'number'
    },
    {
        name : 'stroke', description: 'Grosor de la línea', type: 'number'
    }
   
  ];

  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Prop Name
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Type
            </th>
            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
              Description
            </th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-200'>
          {props.map((prop) => (
            <React.Fragment key={prop.name}>
              <tr className='cursor-pointer' onClick={() => toggleDropdown(prop.name)}>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{prop.name}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-500'>{prop.type}</td>
                <td className={`px-6 ${prop.details && 'bg-slate-200'} py-4 whitespace-nowrap text-sm text-gray-500`}>{prop.description} {prop.details && (openDropdown === prop.name ? '▼' : '►')}</td>
              </tr>
              {openDropdown === prop.name && prop.details && (
                prop.details.map(detail => (
                  <React.Fragment key={detail.name}>
                    <tr className='bg-gray-100' onClick={() => toggleSubDropdown(detail.name)}>
                      <td colSpan={3} className='px-6 py-4'>
                        <div className='flex justify-between items-center'>
                          <span className='text-sm cursor-pointer font-medium text-gray-900'>{detail.name} {detail.subDetails && (openSubDropdown === detail.name ? '▼' : '►')}</span>
                          <span className='text-sm text-gray-500 font-bold'>{detail.type}</span>
                        </div>
                        <div className='text-sm text-gray-500'>{detail.description}</div>
                      </td>
                    </tr>
                    {openSubDropdown === detail.name && detail.subDetails && (
                      <tr className='bg-gray-200'>
                        <td colSpan={3}>
                          <div className='px-8 py-4'>
                            {detail.subDetails.map(subDetail => (
                              <div key={subDetail.name} className='text-sm'>
                                <p><strong>{subDetail.name}</strong> ({subDetail.type}): {subDetail.description}</p>
                              </div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropsTable;
