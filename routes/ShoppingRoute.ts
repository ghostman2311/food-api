import express from 'express'
import { GetFoodAvailibility, GetFoodIn30Mins, GetTopRestaurants, SearchFood } from '../controllers/Shopping'


const router = express.Router()


router.get('/:pincode', GetFoodAvailibility)

router.get('/top-restaurants/:pincode', GetTopRestaurants)

router.get('/foods-in-30-min/:pinocde', GetFoodIn30Mins)

router.get('/search/:pincode', SearchFood)

router.get('/restaurant/:id')

export {
    router as ShoppingRoute
}