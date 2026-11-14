// import {useParams}
import { useState } from "react";

export default function Product({ recipe }) {
  const [servings, setServings] = useState(1);

  return (
    <div>
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <img src="{recipe.image_url}"></img>
      <p>Servings</p>
      <div class="Counter">
        <button
          class="minus-1"
          onClick={setServings(() => servings - 1)}
        ></button>
        <p>{servings}</p>
        <button
          class="plus-1"
          onClick={setServings(() => servings + 1)}
        ></button>
      </div>
    </div>
  );
}
