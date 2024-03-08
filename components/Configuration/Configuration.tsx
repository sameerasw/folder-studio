import Image from 'next/image'
import { Button } from '@/components/Button'
import { OnChangeConfig } from '@/components/FolderEditor'
import { DownloadIcon, FolderIcon, ReloadIcon } from '@/icons'
import { Config } from '@/utils/icons'
import { useRef } from 'react'
import { defaultIcons } from './defaultIcons'

export function Configuration({
   loadingPreview,
   configuration,
   onChangeConfig,
   downloadFile,
   downloading,
}: {
   loadingPreview: boolean
   configuration: Config
   onChangeConfig: OnChangeConfig
   downloading: boolean
   downloadFile: () => void
}) {
   const inputRef = useRef<HTMLInputElement>(null)

   function openFileExporer() {
      if (inputRef.current) {
         inputRef.current.click()
      }
   }

   return (
      <aside
         className='relative h-full w-96 rounded-xl border border-zinc-200 p-5 flex flex-col gap-5 shadow-sm'
         style={{
            height: 'calc(100vh - 40px)',
         }}
      >
         <h1 className='font-medium'>Configuration</h1>

         <input
            type='file'
            accept='image/*'
            className='hidden'
            ref={inputRef}
            onChange={(e) => {
               const files = e.target.files
               const file = files ? files[0] : null

               if (!file) {
                  return
               }

               onChangeConfig('icon', file)
            }}
         />

         <select
            className='h-10 border border-zinc-200 rounded-md px-3 py-2 w-full appearance-none cursor-pointer'
            value={configuration.theme}
            onChange={(e) => {
               onChangeConfig('theme', e.target.value as Config['theme'])
            }}
         >
            <option value='dark'>Dark Mode</option>
            <option value='light'>Light Mode</option>
         </select>

         <select
            className='h-10 border border-zinc-200 rounded-md px-3 py-2 w-full appearance-none cursor-pointer'
            value={configuration.adjustColor}
            onChange={(e) => {
               onChangeConfig('adjustColor', Number(e.target.value))
            }}
         >
            <option value={1}>Adjust icon color</option>
            <option value={0}>Preserve icon color</option>
         </select>

         <ul className='grid grid-cols-7 gap-3'>
            {defaultIcons.map((icon, i) => {
               const selected = configuration.icon === icon.name

               return (
                  <li
                     className={
                        'w-full p-1 aspect-square cursor-pointer border rounded-md ' +
                        (selected ? ' border-zinc-200' : 'border-transparent')
                     }
                     key={i}
                     onClick={() => onChangeConfig('icon', icon.name)}
                  >
                     <Image
                        priority
                        alt={`${icon.name} icon`}
                        src={icon.src}
                        className='w-full h-full'
                     />
                  </li>
               )
            })}
         </ul>

         <Button
            variant='outlined'
            className='w-full mt-auto'
            onClick={() => openFileExporer()}
            disabled={loadingPreview}
         >
            <FolderIcon className='h-5 w-5 stroke-2' />
            <span>Custom Icon</span>
         </Button>

         <Button
            className='w-full'
            disabled={downloading}
            onClick={() => downloadFile()}
         >
            {downloading ? (
               <ReloadIcon className='h-5 w-5 text-[10px] animate-spin' />
            ) : (
               <DownloadIcon className='h-5 w-5 stroke-2' />
            )}

            <span>Download</span>
         </Button>
      </aside>
   )
}