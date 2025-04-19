import styles from "./ArtPhotoBlock.module.css"
import PhotoContentButtonCard from "./ArtPhotoCard/PhotoContentButtonCard.js"

function ArtPhotoBlock() {
    return ( 
        <section className={styles.eighthSection}>
            <div className={styles.wrapper}>
                <h3>АРТ & ФОТОГРАФИИ</h3>
                <PhotoContentButtonCard />
            </div>
        </section>
     );
}

export default ArtPhotoBlock;