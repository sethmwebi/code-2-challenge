import React, { useEffect, useState } from "react";
import "./BotCollection.css";
import Bot from "./Bot";

const BotCollection = () => {
  const [bots, setBots] = useState([]);
  useEffect(() => {
    async function getBots() {
      try {
        const res = await fetch("http://localhost:8002/bots");
        if (res.ok) {
          const result = await res.json();
          setBots(result);
        }
      } catch (error) {
        console.log("something went wrong");
      }
    }

    getBots();
  }, []);

  const onDelete = (id) => {
    const myUpdatedBots = bots.filter((bot) => bot.id !== id);
    setBots(myUpdatedBots);
  };

  return (
    <div className="bots">
      {bots.map(
        ({
          id,
          name,
          health,
          damage,
          armor,
          bot_class,
          catchphrase,
          avatar_url,
          created_at,
          updated_at,
        }) => {
          return (
            <Bot
              id={id}
              key={`bot-collection-${id}`}
              name={name}
              health={health}
              damage={damage}
              armor={armor}
              bot_class={bot_class}
              catchphrase={catchphrase}
              avatar_url={avatar_url}
              created_at={created_at}
              updated_at={updated_at}
              setBots={setBots}
              onDelete={() => onDelete(id)}
            />
          );
        },
      )}
    </div>
  );
};

export default BotCollection;
