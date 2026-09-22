import styles from './ChatExchange.module.css'

/**
 * A styled, redacted rendering of a real message exchange — not a literal
 * screenshot. Only the words are reproduced; phone numbers, receipts and
 * other private detail from the original conversation are left out.
 */
export default function ChatExchange({ withName, messages, note }) {
  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <span className={styles.dot} />
        <span>Exchange with {withName}</span>
      </div>
      <div className={styles.thread}>
        {messages.map((m, i) => (
          <div key={i} className={`${styles.row} ${m.from === 'us' ? styles.rowUs : styles.rowHer}`}>
            <div className={styles.bubble}>
              <p>{m.text}</p>
              {m.from === 'us' && <span className={styles.ticks}>✓✓</span>}
            </div>
          </div>
        ))}
      </div>
      {note && <p className={styles.note}>{note}</p>}
    </div>
  )
}
