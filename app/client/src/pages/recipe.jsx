import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { backend } from '../lib/backend.js'
import { Link } from 'react-router-dom';

import { Heading, Image, IconButton, Button } from "@chakra-ui/react"


export default function Recipe({}){
    const { id } = useParams();

    const [recipe, setRecipe] = useState();


    const [ingredients, setIngredients] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    
    useEffect(() => {
        const fetchRecipes = async () => {
          try {
            const res = await backend.get(`/api/recipes/${id}`)

            setRecipe(res.data)
            
          } catch (err) {
            setError(err.message)
          } finally {
          }
        }

        const fetchI = async () =>{
            try {
            const res = await backend.get(`/api/ingredients/${id}`)

            console.log(res);
            console.log(res.data);
            setIngredients([...res.data])
            
            console.log(recipe);
          } catch (err) {
            setError(err.message)
          } finally {
            setLoading(false)
          }
        }
    
        fetchRecipes()
        fetchI()
      }, [])

/*    



*/
     return (
        <div className="w-full flex items-center justify-center">
            {!loading && (
            <div className='flex flex-col gap-2 mt-10 items-center '>
                <div className = "h-10"></div>
                <div className="w-full  h-10 pt-20"> 
                    <Link to="/"><Button>Back</Button></Link>
                     </div>
                <Heading size="3xl">{recipe.title}</Heading>

                <div className="w-full">{recipe.cook_minutes + recipe.prep_minutes} minutes total</div>

                <Image src={`${recipe.image_url}`} height="230px" width="440px" rounded="md" />
                
                <Heading className="w-full"> Description</Heading>
                <div className="w-full">{recipe.description} </div>
                <div className = "w-full border-black h-1 bg-black rounded-xl"/>
                <div className="h-4"/>
                <div classname = "w-full flex justify-center pt-5"> <Button >Start Cooking</Button></div>

            </div>
          )}
        </div>
     )

}