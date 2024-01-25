"use client"
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { useDebounce } from '@/hooks/use-debounce'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { title } from 'process'

const SearchInput = () => {
  const [value , setValue] = useState();
  const debouncedValues = useDebounce(value);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentCategoryId = searchParams.get("categoryID")

  useEffect(()=>{
    const url = qs.stringifyUrl({
      url : pathname,
      query : {
        categoryID : currentCategoryId,
        title : debouncedValues,

      },
    },{skipEmptyString: true , skipNull : true})
    router.push(url)

  },[pathname,router,currentCategoryId,debouncedValues])
  return (
    <div className="relative ">
      <Search className='h-4 w-4 absolute top-3 left-3 text-slate-600'/>
      <Input  onChange={(e:any)=>{setValue(e.target.value)}}value={value}  placeholder="Search for a Course"className='w-full md:w-[300px] pl-9 rounded-full bg-slate-100 focus-visible:ring-slate-200'/>
    </div>
  )
}

export default SearchInput