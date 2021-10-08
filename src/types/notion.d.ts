declare namespace Notion {
  type Data = {
    fullname: string | null
    approval: boolean
    reciept: string | null
    uid: string | null
    wnid: string | null
  }
  type User2 = {
    uid: string | null
    fullName: string | null
    nickname: string | null
    ic: string | null
    contact: string | null
    address1: string | null
    address2?: string | null
    email: string | null
    dob: string | null
    cluster: string | null
    gender: string | null
    status: string | null
    smallTeam: string | null
    cg: string | null
    registered: boolean
  }
}
