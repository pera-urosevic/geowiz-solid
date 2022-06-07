export const classStyles = (styles: (string | undefined)[]) => {
  return { class: styles.filter((s) => s).join(' ') }
}
