import { RichTextPropertyValue } from '@notionhq/client/build/src/api-types'
import { NextApiRequest, NextApiResponse } from 'next'
import notion from '../../lib/notion'
import { getEnvVar } from '../../utils/helpers'

const updateStatus = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const uid = req.query.uid as string
  const wnid = (Math.floor(Math.random() * 999) + 1).toString()

  const env = getEnvVar('NOTION_DATABASE').env

  try {
    const res1 = await notion.databases.query({
      database_id: env as string,
      filter: {
        and: [
          {
            property: 'Uid',
            text: { equals: uid as string },
          },
        ],
      },
    })

    const pageId = res1.results[0].id

    const updateRes = await notion.pages.update({
      page_id: pageId,
      archived: false,
      properties: {
        Approval: {
          type: 'checkbox',
          checkbox: true,
        },
        WNID: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: {
                content:
                  wnid.length == 1 ? 'WN00' + wnid : wnid.length == 2 ? 'WN0' + wnid : 'WN' + wnid,
              },
            },
          ],
        },
      },
    })

    const xd = (updateRes.properties['WNID'] as RichTextPropertyValue).rich_text[0].plain_text

    return res.status(200).json({ wnid: xd })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}
export default updateStatus
