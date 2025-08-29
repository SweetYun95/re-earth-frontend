import styles from './Button.module.css'

export default function Button({ variant = 'primary', children, ...props }) {
   // variant = primary | secondary | danger
   return (
      <button className={styles[variant]} {...props}>
         {children}
      </button>
   )
}
