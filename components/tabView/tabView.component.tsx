import React from 'react'
import { Tab } from '@headlessui/react'

interface Props {
  headers?: string[];
  children: React.ReactNode[];
  activeTab?: number;
}

const TabView: React.FC<Props> = ({ headers, children }) => {
  if (
    Array.isArray(headers) &&
    Array.isArray(children) &&
    headers.length != children.length
  ) {
    return (
      <div style={{ backgroundColor: '#fcc' }}>
        error: number of headers does not match number of tab panes
      </div>
    )
  }

  return (
    <Tab.Group>
      <Tab.List className="flex flex-row items-start mb-0 mx-4 pb-4">
        {headers?.map((header) => (
          <Tab
            key={header}
            className={'flex-1 text-left outline-none'}
          >
            {({ selected }) => (
              <a
                className={
                  'px-3 py-0.5 mx-2 border rounded-full last:mr-0 font-bold uppercase leading-normal decoration-blue-600 decoration-2 ' +
                  (selected
                    ? 'border-blue text-blue drop-shadow-sm'
                    : 'border-none')
                }
              >
                {header}
              </a>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className={`
        h-full
      `}>
        {children.map((panel, index) => (
          <Tab.Panel
            id={`${index}`}
            key={index}
          >
            {panel}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default TabView
