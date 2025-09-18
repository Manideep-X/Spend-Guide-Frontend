import { FunnelIcon } from "@heroicons/react/24/outline"
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid"

const EmptyListFiller = ({ emptyMsg }) => {
  return (
    <section className="flex h-4/5 w-full items-center justify-center gap-5">
        <section className="sm:w-2/3 w-11/12 h-2/3 flex flex-col items-center justify-center rounded-2xl md:shadow-[inset_2px_150px_150px_rgba(255,255,255,0.5)] shadow-[inset_2px_90px_100px_rgba(255,255,255,0.6)] text-center">
            <div className="w-30 p-8 bg-white/80 rounded-full">
              <DocumentMagnifyingGlassIcon className="opacity-50" />
            </div>
            <h2 className="sm:text-lg font-semibold mt-3">
              { emptyMsg || 'Select filters or search with keywords' }
            </h2>
            <p className="text-sm hidden sm:flex">Click "See more filters" for more options</p>
            <p className="text-sm flex sm:hidden">Tap "<FunnelIcon className="w-5" />" to see more filters</p>
        </section>
    </section>
  )
}

export default EmptyListFiller