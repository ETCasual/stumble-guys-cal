/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react'

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
  return (
    <>
      <Head>
        <title>Approval System</title>
      </Head>

      <div className="px-10 py-5">
        {data.map((d, i) => (
          <DataCard
            fullname={d.fullname}
            approval={d.approval}
            reciept={d.reciept}
            key={i}
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
    })

    const results = res.results.map((result) => parseUser(result))
    return { props: { data: results, error: false } }
  } catch (err) {
    console.log(err)
    return { props: { error: true } }
  }
}
