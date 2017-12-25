export interface FeedEntry {
     title: string,
     pubDate: Date,
     link: string,
     guid: string,
     author: string,
     thumbnail: string,
     description: string,
     content: string,
     enclosure: Array<string>,  
     categories: Array<string>
}
