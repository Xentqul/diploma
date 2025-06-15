import { Link } from 'react-router-dom';
import styles from './BackButton.module.css';

function BackButton({ to = '/', text = 'домой', className = '' }) {
  return (
    <Link to={to} className={`${styles.backButton} ${className}`}>
      ← {text}
    </Link>
  );
}

export default BackButton;