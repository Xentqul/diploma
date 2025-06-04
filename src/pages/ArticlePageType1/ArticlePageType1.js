import styles from "./ArticlePageType1.module.css";
import ArticleHeader from "@/shared/components/ArticleHeader/ArticleHeader";
import articles from "@/data/articles.json";
import AdBlock from "../../shared/components/AdBlock/AdBlock";
import { useParams } from "react-router-dom";

function ArticlePageType1() {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  // Отладочная информация
  console.log("Current slug:", slug);
  console.log("Found article:", article);
  if (article) {
    console.log("Article content:", article.content);
    console.log("Is array?", Array.isArray(article.content));
    console.log("Content length:", article.content?.length);
  }

  if (!article) {
    return <div>Статья не найдена</div>;
  }

  return (
    <div className={styles.articleWrapper}>
      <ArticleHeader
        title={article.title}
        description={article.description}
        tags={article.tags}
        author={article.author}
        publishedAt={article.publishedAt}
        image={article.images?.[0]}
        isFavorite={false}
      />

      <div className={styles.content}>
        {article.content &&
        Array.isArray(article.content) &&
        article.content.length > 0 ? (
          article.content.map((block, index) => {
            if (!block || !block.type) return null;

            const hasLink = block.link?.url && block.link?.ru;

            switch (block.type) {
              case "paragraph":
                return (
                  <p key={index} className={styles.paragraph}>
                    {block.text?.ru || "Текст отсутствует"}
                  </p>
                );

              case "subheader":
                return (
                  <h2 key={index} className={styles.subheader}>
                    {block.text?.ru || "Подзаголовок"}
                  </h2>
                );

              case "image-text-left":
                return hasLink ? (
                  // Рекламный блок
                  <div key={index} className={styles.adBlock}>
                    <AdBlock
                      image={block.image}
                      text={block.text?.ru}
                      link={block.link}
                      isImageLeft={true}
                    />
                  </div>
                ) : (
                  // Обычный блок
                  <div
                    key={index}
                    className={`${styles.imageBlock} ${styles.left}`}
                  >
                    {block.image && (
                      <img
                        src={block.image}
                        alt=""
                        className={styles.image}
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    )}
                    <div className={styles.text}>
                      {block.text?.ru && (
                        <p className={styles.textSettings}>{block.text.ru}</p>
                      )}
                      {hasLink && (
                        <a href={block.link.url} className={styles.link}>
                          {block.link.ru || "Ссылка"}
                        </a>
                      )}
                    </div>
                  </div>
                );

              case "image-text-right":
                return hasLink ? (
                  // Рекламный блок
                  <div key={index} className={styles.adBlock}>
                    <AdBlock
                      image={block.image}
                      text={block.text?.ru}
                      link={block.link}
                      isImageLeft={false}
                    />
                  </div>
                ) : (
                  // Обычный блок
                  <div
                    key={index}
                    className={`${styles.imageBlock} ${styles.right}`}
                  >
                    <div className={styles.text}>
                      {block.text?.ru && (
                        <p className={styles.textSettings}>{block.text.ru}</p>
                      )}
                      {hasLink && (
                        <a href={block.link.url} className={styles.link}>
                          {block.link.ru || "Ссылка"}
                        </a>
                      )}
                    </div>
                    {block.image && (
                      <img
                        src={block.image}
                        alt=""
                        className={styles.image}
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    )}
                  </div>
                );

              case "image":
                return (
                  <div key={index} className={styles.imageOnlyBlock}>
                    <img
                      src={block.image.url}
                      alt="Контент"
                      className={styles.imageOnly}
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    {block.image.caption?.ru && (
                      <figcaption className={styles.imageCaption}>
                        {block.image.caption.ru}
                      </figcaption>
                    )}
                  </div>
                );

              case "text-highlight":
                return (
                  <p key={index} className={styles.highlightedText}>
                    {block.text?.ru || "Текст отсутствует"}
                  </p>
                );
              case "text":
                return (
                  <p key={index} className={styles.regularText}>
                    {block.text?.ru || "Текст отсутствует"}
                  </p>
                );

              default:
                console.warn(`Неизвестный тип блока: ${block.type}`);
                return null;
            }
          })
        ) : (
          <div className={styles.emptyContent}>
            <p>Контент находится в процессе переноса из старого источника</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArticlePageType1;
