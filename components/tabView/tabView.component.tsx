import React, { Fragment } from 'react'
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
      <Tab.List className="flex mb-0 ml-6 ml-list-none flex-wrap pt-10 pb-4 flex-row">
        {headers?.map((header) => (
          <Tab as={Fragment} key={header} className="-mb-px mr-2 last:mr-0 flex-auto text-left">
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={
                  'text-s font-bold uppercase px-5 py-3 block leading-normal underline-offset-4 decoration-blue-600 decoration-2 ' +
                      (selected
                        ? 'underline text-blue'
                        : 'no-underline')
                }
              >
                {header}
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {children.map((panel, index) => (
          <Tab.Panel
            className='m-2 glow-red-lg shadow-lg'
            id={'index'}
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
