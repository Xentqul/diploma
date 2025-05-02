import styles from './LabelAndInfo.module.css';

function LabelAndInfo({ label, value }) {
    return ( 
        <div className={styles.componentWrapper}>
            <span>{label}:</span>
            <p>{value}</p>
        </div>
    );
}

export default LabelAndInfo;