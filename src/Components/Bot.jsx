import React from "react";
import "./Bot.css";

const Bot = ({
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
  onRelease,
  onDelete,
  myBot = false,
}) => {
  const handleAddBot = async () => {
    const botData = {
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
    };

    try {
      const response = await fetch("http://localhost:8002/my-bots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(botData),
      });

      if (response.ok) {
        console.log(`${name} has been added to my-bots!`);
      } else {
        console.error("Failed to add the bot to my-bots.");
      }
    } catch (error) {
      console.error("Error adding the bot:", error);
    }
  };

  const handleReleaseBot = async () => {
    try {
      const response = await fetch(`http://localhost:8002/my-bots/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        if (onRelease) {
          onRelease(id);
        }
      } else {
        console.error("Failed to release the bot from my-bots.");
      }
    } catch (error) {
      console.error("Error releasing the bot:", error.message);
    }
  };

  const handleDeleteBot = async (id) => {
    try {
      const response = await fetch(`http://localhost:8002/bots/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        if (onDelete) {
          onDelete(id);
        }
      } else {
        console.log("Failed to delete the bot from bots collection");
      }
    } catch (error) {
      console.log("Error deleting the bot: ", error.message);
    }
  };

  return (
    <div className="bot-container">
      <img src={avatar_url} alt={`${name}'s avatar`} className="bot-avatar" />
      <div className="bot-info">
        <h2 className="bot-name">{name}</h2>
        <p className="bot-id">ID: {id}</p>
        <p className="bot-class">Class: {bot_class}</p>
        <p className="bot-health">Health: {health}</p>
        <p className="bot-damage">Damage: {damage}</p>
        <p className="bot-armor">Armor: {armor}</p>
        <p className="bot-catchphrase">Catchphrase: {catchphrase}</p>
        <p className="bot-dates">
          Created At: {new Date(created_at).toLocaleDateString()}
        </p>
        <p className="bot-dates">
          Updated At: {new Date(updated_at).toLocaleDateString()}
        </p>
        {!myBot ? (
          <>
            <button onClick={handleAddBot} className="add-button">
              Add
            </button>
            <button onClick={() => handleDeleteBot(id)}>Retire Bot</button>
          </>
        ) : (
          <button onClick={handleReleaseBot} className="add-button">
            Release Bot
          </button>
        )}
      </div>
    </div>
  );
};

export default Bot;
