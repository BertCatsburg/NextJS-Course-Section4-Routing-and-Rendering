import {DUMMY_NEWS} from "@/data/dummy-news";
import Image from 'next/image'
import {notFound} from "next/navigation";

type NewsDetailsPageType = {
    params: Promise<{
        newsSlug: string
    }>
}

const NewsDetailsPage = async ({params}: NewsDetailsPageType) => {
    const {newsSlug} = await params
    const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug == newsSlug)

    if (!newsItem) {
        notFound()
    }

    return (
        <article className="news-article">
            <header>
                <div className="imageContainer">
                    <Image src={`/images/news/${newsItem.image}`} alt={newsItem.title} fill />
                </div>
                <h1>{newsItem.title}</h1>
                <time dateTime={newsItem.date}>{newsItem.date}</time>
            </header>
            <p>{newsItem.content}</p>
        </article>
    );
}

export default NewsDetailsPage
