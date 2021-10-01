/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react'

import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { getEnvVar } from '../utils/helpers'
import notion, { parseUser } from '../lib/notion'
import { DataCard } from '../components/DataCard'

export type StartPageProps = {
  data: Notion.Data[]
  error: boolean
}

const StartPage: React.FC<StartPageProps> = ({ data }) => {
  const [dataState] = useState<typeof data>(data)
  const [searchText, setSearchText] = useState<string>('')
  const [checkState, setCheckState] = useState<boolean>(false)

  const data2 = data.map((d) => d.wnid)

  const handleChange = (text: string) => {
    setSearchText(text)
  }

  return (
    <>
      <Head>
        <title>Approval System</title>
      </Head>
      <div className="sticky justify-around items-center top-0 flex focus-within:outline-none text-SECONDARY w-full bg-[#210440] text-center font-montserrat text-sm sm:text-base py-2 px-3 placeholder-[#a67bd4]">
        <button
          className="bg-green-600 hover:bg-green-400 transition px-5 py-3 rounded-lg text-xl font-montserrat disabled:bg-gray-700"
          onClick={() => {
            setCheckState(!checkState)
          }}
        >
          {checkState ? 'Back To Normal' : 'Check Duplicates'}
        </button>
        <p className="font-questrial text-2xl text-white">Search for Name : </p>
        <input
          type="text"
          className="lg:w-[600px] md:w-[500px] sm:w-[400px] w-[240px] rounded-md bg-gray-200 py-2 px-3 "
          placeholder="Name.."
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>

      <div className="px-10 py-5">
        {checkState
          ? data2
              .filter((d, i) => data2.indexOf(d) !== i)
              .map((d) =>
                // <DataCard
                //   fullname={d.fullname}
                //   approval={d.approval}
                //   reciept={d.reciept}
                //   key={d.uid}
                //   uid={d.uid}
                //   wnid={d.wnid}
                // />
                d ? (
                  <button
                    key={d}
                    className="bg-green-600 hover:bg-green-400 transition px-5 py-3 rounded-lg text-xl font-montserrat disabled:bg-gray-700"
                  >
                    {d}
                  </button>
                ) : null
              )
          : dataState
              .filter((d) => d.fullname.includes(searchText.toUpperCase()))
              .map((d) => (
                <DataCard
                  fullname={d.fullname}
                  approval={d.approval}
                  reciept={d.reciept}
                  key={d.uid}
                  uid={d.uid}
                  wnid={d.wnid}
                />
              ))}
      </div>
    </>
  )
}
export default StartPage

export const getServerSideProps: GetServerSideProps = async () => {
  const env = getEnvVar('NOTION_DATABASE').env

  try {
    const res = await notion.databases.query({
      database_id: env as string,
      // filter: {
      //   and: [
      //     {
      //       property: 'Approval',
      //       checkbox: {
      //         equals: false,
      //       },
      //     },
      //   ],
      // },
    })

    const res2 = await notion.databases.query({
      database_id: env as string,
      start_cursor: res.next_cursor,
    })

    const res3 = await notion.databases.query({
      database_id: env as string,
      start_cursor: res2.next_cursor,
    })

    const results = res.results.map((result) => parseUser(result))
    const results2 = res2.results.map((result) => parseUser(result))
    const results3 = res3.results.map((result) => parseUser(result))

    const joinedArray = results.concat(results2).concat(results3)

    // console.log(JSON.stringify(joinedArray, null, 2))

    return { props: { data: joinedArray, error: false } }
  } catch (err) {
    console.log(err)
    return { props: { error: true } }
  }
}
