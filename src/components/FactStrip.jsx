import styles from './FactStrip.module.css'

/* Line icons, 24x24, stroked in gold by the stylesheet */
const icons = {
  building: <><path d="M4 21V6l8-3 8 3v15M4 21h16" /><path d="M9 9h2M13 9h2M9 13h2M13 13h2M10 21v-4h4v4" /></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" /></>,
  initiative: <><path d="M4 4h16v12H10l-4 4v-4H4z" /><rect x="8" y="7.5" width="8" height="5" rx="1" /></>,
  crown: <path d="M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z" />,
  award: <><circle cx="12" cy="9" r="5" /><path d="M8.5 13.5L7 21l5-3 5 3-1.5-7.5" /></>,
  pin: <><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></>,
}

/**
 * A cream band of short facts, each with an icon, a bold label and a line of
 * detail. It only appears on phones, where it replaces text that would
 * otherwise crowd the hero; on larger screens the hero shows that text itself.
 *
 *   <FactStrip id="roles" title="Roles & titles" items={[{ icon: 'crown', label: 'Atobase', detail: 'Okeluse Kingdom' }]} />
 */
export default function FactStrip({ id, title, items }) {
  return (
    <section id={id} className={styles.strip} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className={`${styles.title} reveal`}>{title}</h2>
      <div className={`${styles.row} reveal-stagger`}>
        {items.map(item => (
          <div key={item.label} className={styles.item}>
            <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">{icons[item.icon]}</svg>
            <div className={styles.label}>{item.label}</div>
            <div className={styles.detail}>{item.detail}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
