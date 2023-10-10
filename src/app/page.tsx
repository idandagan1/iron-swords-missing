'use client'
import Image from 'next/image'
import {useEffect, useState} from 'react'
import {Search} from '../components/search'
import {useSearchParams} from 'next/navigation'  // Correct import
import {SearchResults} from '../components/searchResults'
import PersonData from './utils/types'
import {fetchData} from "@/actions";

export default function Home() {
  const [data, setData] = useState<(PersonData)[]>([]);
  const searchParams = useSearchParams()

  useEffect(() => {
    const name = searchParams.get('search');
    if (name) {
      const fetchQueryData = async () => {
        const result: PersonData[] = await fetchData({ name });
        setData(result);
      };
      fetchQueryData();
    }
  }, [searchParams]);

  return (
    <main className="flex flex-col min-h-screen p-4 sm:p-16">
      <h1 className='text-center text-xl pb-8'> עזרה באיתור נעדרים וחטופים</h1>
      {data.length == 0 && <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert self-center"
        src="/logo.jpg"
        alt="Logo"
        width={180}
        height={37}
        priority
      />}

    <div className="flex min-h-screen flex-col items-center gap-6 p-4 sm:p-16">
      <Search setData={setData}/>
      <SearchResults data={data} />
    </div>
    </main>
  )
}
