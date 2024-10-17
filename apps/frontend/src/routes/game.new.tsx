import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/game/new')({
  component: SetupGameForm,
});

function SetupGameForm() {
    const navigate = Route.useNavigate();

    const handleSubmitNewGame = () => {
        //Création de la partie: ajouter un hook createLobby ou createGame
        
        //Redirection /games/id

        //Startgame doit juste lancer la game
    }
  return (
    <form action="" method="get" className="form-example">
      <div className="form-example">
        <label htmlFor="name">Entrez votre nom</label>
        <input type="text" name="name" id="name" required />
      </div>

      <div className="form-example">
        <p>Choissisez votre adversaire</p>
        <select>
          <option>J-Ordi (NPC)</option>
          <option>Inviter un ami</option>
          <option>Random player</option>
        </select>
      </div>
      <div className="form-example">
        <p>Choissisez votre type de partie</p>
        <select>
          <option>Normal</option>
          <option>Super Partie</option>
        </select>
      </div>
    </form>
  );
}
