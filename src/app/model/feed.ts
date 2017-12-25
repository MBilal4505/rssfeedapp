import { FeedEntry } from './feed-entry';
import { FeedInfo } from './feed-info';

export interface Feed {
    status: string,
    feed: FeedInfo,
    items: Array<FeedEntry>
}
