import { Client } from '@notionhq/client'
import {
  Page,
  RichTextPropertyValue,
  TitlePropertyValue,
  CheckboxPropertyValue,
  URLPropertyValue,
} from '@notionhq/client/build/src/api-types'

export const allowedContent = {
  header: true,
  sub_header: true,
  sub_sub_header: true,
  divider: true,
  text: true,
  bulleted_list: true,
  numbered_list: true,
  image: true,
  video: true,
  audio: true,
  quote: true,
}

if (!process.env.NOTION_SECRET_API_KEY) {
  throw new Error('Unable to connect Notion, NOTION_SECRET_API_KEY not provided in .env.local')
}

export default new Client({ auth: process.env.NOTION_SECRET_API_KEY })

export const parseUser = (page: Page): Notion.Data => {
  return {
    uid:
      (page.properties.Uid as RichTextPropertyValue).rich_text.length !== 0
        ? (page.properties.Uid as RichTextPropertyValue).rich_text[0].plain_text
        : null,
    fullname:
      (page.properties['Full Name'] as TitlePropertyValue).title.length !== 0
        ? (page.properties['Full Name'] as TitlePropertyValue).title[0].plain_text
        : null,
    approval: (page.properties.Approval as CheckboxPropertyValue).checkbox,
    reciept:
      (page.properties.Receipt as URLPropertyValue).url.length !== 0
        ? (page.properties.Receipt as URLPropertyValue).url
        : null,
    wnid:
      (page.properties.WNID as RichTextPropertyValue).rich_text.length !== 0
        ? (page.properties.WNID as RichTextPropertyValue).rich_text[0].plain_text
        : null,
  }
}
