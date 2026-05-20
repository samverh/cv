import { CardStack } from './components/CardStack';
import { cards } from './data/cards';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <div
        className="app__background"
        style={{ backgroundImage: 'url(/cv/images/background_1.jpg)' }}
      />
      <div className="app__overlay" aria-hidden="true" />
      <main className="app__main">
        <CardStack cards={cards} />
      </main>
      <footer className="app__footer">
        <p>Sam Verhezen · © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
