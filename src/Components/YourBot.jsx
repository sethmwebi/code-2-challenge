import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Bot from "./Bot";

const YourBot = () => {
  const [myBots, setMyBots] = useState([]);
  useEffect(() => {
    async function fetchYourBots() {
      try {
        const res = await fetch("http://localhost:8002/my-bots");
        if (res.ok) {
          const result = await res.json();
          setMyBots(result);
        }
      } catch (error) {
        console.log("something went wrong!");
      }
    }

    fetchYourBots();
  }, []);

  const onRelease = (id) => {
    const myUpdatedBots = myBots.filter((bot) => bot.id !== id);
    setMyBots(myUpdatedBots);
  };

  return (
    <div>
      <Navbar />
      {myBots.map(
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
              key={id}
              id={id}
              name={name}
              health={health}
              damage={damage}
              armor={armor}
              bot_class={bot_class}
              catchphrase={catchphrase}
              avatar_url={avatar_url}
              created_at={created_at}
              updated_at={updated_at}
              myBot={true}
              setMyBots={setMyBots}
              onRelease={() => onRelease(id)}
            />
          );
        },
      )}
    </div>
  );
};

export default YourBot;
