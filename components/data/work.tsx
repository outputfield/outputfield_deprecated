export default class Work{
  id: number
  type: string
  link: string

  constructor(id: number, type: string, link: string){
    this.id = id
    this.type = type
    this.link = link
  }
}
