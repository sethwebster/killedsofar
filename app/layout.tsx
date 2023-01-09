import styles from './layout.module.css'
import '../styles/globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>        
      </head>
      <body>
        <div className={styles.wrapper}>{children}</div>
      </body>
    </html>
  );
}
