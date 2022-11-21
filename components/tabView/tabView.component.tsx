import React from 'react'

interface Props {
  headers?: string[];
  children: React.ReactNode[];
  activeTab?: number;
}

const TabView: React.FC<Props> = ({ headers, children }) => {
  const [openTab, setOpenTab] = React.useState(0)

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
    <div className="flex flex-wrap">
      <div className="w-full">
        {/* TAB HEADER */}
        <ul
          className="flex mb-0 ml-6 ml-list-none flex-wrap pt-10 pb-4 flex-row"
          role="tablist">
          {headers?.map((header, index) => (
            <li
              key={header}
              className="-mb-px mr-2 last:mr-0 flex-auto text-left">
              <a
                className={
                  'text-s font-bold uppercase px-5 py-3 block leading-normal underline-offset-4 decoration-blue-600 decoration-2 ' +
                  (openTab === index
                    ? 'underline text-blue'
                    : 'no-underline')
                }
                onClick={(e) => {
                  e.preventDefault()
                  setOpenTab(index)
                }}
                data-toggle="tab"
                href={`#${header}`}
                role="tablist">
                {header}
              </a>
            </li>
          ))}
        </ul>
        {/* TAB HEADERS END */}

        {/* TAB PANELS */}
        <div className="relative flex flex-col break-words w-full px-4 ">
          {children.map((panel, index) => (
            <div
              className={`m-2 glow-red-lg shadow-lg ${openTab === index ? 'block' : 'hidden'}`}
              id={'index'}
              key={index}
            >
              {panel}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TabView
