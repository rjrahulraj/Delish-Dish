
import { assets } from '../../assets/assets'
import styles from './AppDownload.module.css'

const AppDownload = () => {
  return (
    <div className={styles.appDownload}>
     <p>For better experience download App </p>
     <div className={styles.AppDownloadLogo}>
          <img src={assets.play_store} alt="" />
          <img src={assets.app_store} alt="" />
     </div>
      
    </div>
  )
}

export default AppDownload
