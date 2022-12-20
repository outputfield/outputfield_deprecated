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
      <Tab.List className="flex mb-0 ml-6 ml-list-none flex-wrap pb-4 flex-row">
        {headers?.map((header) => (
          <Tab key={header} >
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <a
                className={
                  'px-4 py-0 mx-2 border rounded-full -mb-px mr-2 last:mr-0 flex-auto text-left text-s font-bold uppercase block leading-normal underline-offset-4 decoration-blue-600 decoration-2 ' +
                      (selected
                        ? 'border-blue'
                        : 'border-black')
                }
              >
                {header}
              </a>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
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
