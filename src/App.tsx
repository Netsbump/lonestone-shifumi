import './assets/fonts/fonts.css';

export const App: React.FC = () => {
  return (
    <div className="bg-light-blue text-white">
      <h1 className="text-electric-blue">Titre</h1>
      <p className="text-light-blue">Paragraphe</p>
      <h1>Titre principal</h1>
      <h2>Sous-titre</h2>
      <h3>Titre de section</h3>
      <h4>Sous-section</h4>
      <h5>Petit titre</h5>
      <p className="Texte-courant">Ceci est un paragraphe de texte courant.</p>

      <h2 className="text-left text-blue-500">Un h2 personnalisé</h2>

      <p className="font-overpass text-h5 font-black">
        Un paragraphe utilisant le style de h5
      </p>
      <p className="text-night-blue hover:text-night-blue-dark">
        Texte qui devient plus foncé au survol
      </p>
    </div>
  );
};
