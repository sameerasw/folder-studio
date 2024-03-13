'use client'
import { QuestionMarkIcon } from '@/icons'
import { useState } from 'react'

export function HowToUse() {
   const [open, setOpen] = useState(false)

   return (
      <>
         <button
            className='bg-zinc-950 hover:bg-zinc-800 text-white p-2 rounded-full ml-auto'
            onClick={() => setOpen(true)}
         >
            <QuestionMarkIcon className='w-5 h-5 stroke-2' />
         </button>

         <div
            role='dialog'
            className={
               'fixed inset-0 h-screen w-full px-6 flex items-center justify-center backdrop-brightness-50 transition-all ' +
               (open ? 'opacity-100 z-50' : 'opacity-0 -z-10')
            }
            onClick={(e) => {
               if (e.target === e.currentTarget) {
                  setOpen(false)
               }
            }}
         >
            <div
               onClick={(e) => {
                  e.stopPropagation()
               }}
               className={
                  'px-6 py-4 bg-white border border-zinc-300 rounded-2xl pointer-events-auto w-full max-w-lg max-h-[80vh] overflow-y-auto min-h-96 transition-transform duration-200 ' +
                  (open ? 'scale-100' : 'scale-50')
               }
            >
               <div className='w-full h-full p-4'>
                  <ol className='text-zinc-600 space-y-4'>
                     <li>
                        <span className='font-medium'>Built by</span> <a href="https://github.com/sameerasw">@sameerasw</a> forking from <a href="https://github.com/christianvm">@christianvm.</a>
                     </li>
                     <img src="https://avatars.githubusercontent.com/u/68902530?v=4&size=500" alt="" style={{borderRadius: '10px'}}/>
                  </ol>
               </div>
            </div>
         </div>
      </>
   )
}
