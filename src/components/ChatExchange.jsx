import styles from './ChatExchange.module.css'

function Bubble({ m }) {
  if (m.type === 'document') {
    return (
      <div className={styles.doc}>
        <span className={styles.docIcon}>📄</span>
        <div className={styles.docInfo}>
          <strong>{m.filename}</strong>
          <span>{m.meta}</span>
        </div>
      </div>
    )
  }
  return <p>{m.text}</p>
}

/**
 * A styled, redacted rendering of a real message exchange, in the visual
 * language of a phone chat. Only the words (and a stand-in for the one
 * attachment) are reproduced; phone numbers, account details and other
 * private information from the original conversation are left out.
 */
export default function ChatExchange({ withName, messages, note }) {
  return (
    <div className={styles.phone}>
      <div className={styles.head}>
        <span className={styles.avatar}>{withName?.[0] || '?'}</span>
        <span className={styles.headName}>{withName}</span>
      </div>
      <div className={styles.thread}>
        {messages.map((m, i) => (
          <div key={i} className={`${styles.row} ${m.from === 'us' ? styles.rowUs : styles.rowHer}`}>
            <div className={`${styles.bubble} ${m.type === 'document' ? styles.bubbleDoc : ''}`}>
              <Bubble m={m} />
              <span className={styles.meta}>
                {m.time}
                {m.from === 'us' && <span className={styles.ticks}>✓✓</span>}
              </span>
            </div>
          </div>
        ))}
      </div>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  )
}
