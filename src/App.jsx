import Button from './components/Button/Button'

function App() {
   return (
      <div style={{ display: 'flex', gap: '1rem', padding: '2rem' }}>
         <Button variant="primary">Primary 버튼</Button>
         <Button variant="secondary">Secondary 버튼</Button>
         <Button variant="danger">Danger 버튼</Button>
      </div>
   )
}

export default App
