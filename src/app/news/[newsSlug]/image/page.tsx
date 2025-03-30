import Image from 'next/image'
import {notFound} from "next/navigation";
import {NewsItemType} from "@/types/newsItem";
import { DUMMY_NEWS } from '@/data/dummy-news';

type ImagePageType = {
    params: {
        slug: string
    }
}

const ImagePage = ({params}: ImagePageType) => {

    const newsItemSlug = params.slug

    const newsItem: NewsItemType | undefined = DUMMY_NEWS.find(newsItem => newsItem.slug == newsItemSlug)

    if (!newsItem) {
        notFound()
    }

    return (
        <div className="fullscreen-image">
            <Image src={`/images/news/${newsItem.image}`} alt={newsItem.title} fill />
        </div>
    )
}

export default ImagePage