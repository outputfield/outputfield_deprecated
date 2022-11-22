import React from 'react'

type Props = {
  className?: string;
  children?: React.ReactNode;
}

const Overlay: React.FC<Props> = ({ className, children })  => {
  return (
    <div
      id="filter"
      className={`fixed z-50 inset-0 overflow-y-auto touch-none ${className}`}
      aria-labelledby="filters-modal"
      role="dialog"
      aria-modal="true">
      <div className="flex justify-center min-h-screen text-center sm:block sm:p-0">
        {/* <!--
                Modal panel, show/hide based on modal state.
                TODO: 
                Entering: "ease-out duration-300"
                  From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  To: "opacity-100 translate-y-0 sm:scale-100"
                Leaving: "ease-in duration-200"
                  From: "opacity-100 translate-y-0 sm:scale-100"
                  To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            --> */}

        <div className="block align-bottom bg-white opacity-100 overflow-hidden transform transition-all w-full">
          <div className="bg-white pt-5 pb-4 sm:pb-4">
            <div className="sm:flex sm:items-start">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overlay