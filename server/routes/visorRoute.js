const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const authorisation = require("../middleware/authorise");
const pool = require("../db");
const callVisor = require("../middleware/foodvisor");
const {imgMock} = require("../mockdata/mockVisor")


// get info
router.get("/info", authorisation, asyncHandler(async (req,res,next) => {
    const {recipe_id} = req.query

    const info = await pool.query("SELECT * FROM NutriInfo WHERE recipe_id = $1", [recipe_id]);
    const infoRes = info.rows[0]
    const output = JSON.parse(infoRes.nutrient_dictionary)

    res.json(output);
}))


// call visor api and add nutrient info to db
router.post("/visor", authorisation, asyncHandler(async (req, res, next) => {
    const { imagePath, recipe_id } = req.body;
    const user_id = req.user.id;

    // const imgInfo = await callVisor(imagePath);
    const imgInfo = imgMock
    

    res.json(aggregateNutritionalInfo(imgInfo, recipe_id, user_id));
}));

function aggregateNutritionalInfo(imgInfo, recipe_id, user_id) {
    const nutriInfo = {
        alcohol_100g: 0,
        calcium_100g: 0,
        calories_100g: 0,
        carbs_100g: 0,
        cholesterol_100g: 0,
        copper_100g: 0,
        fat_100g: 0,
        fibers_100g: 0,
        glycemic_index: 0,
        insat_fat_100g: 0,
        iodine_100g: 0,
        iron_100g: 0,
        magnesium_100g: 0,
        manganese_100g: 0,
        mono_fat_100g: 0,
        omega_3_100g: 0,
        omega_6_100g: 0,
        phosphorus_100g: 0,
        poly_fat_100g: 0,
        potassium_100g: 0,
        proteins_100g: 0,
        salt_100g: 0,
        sat_fat_100g: 0,
        selenium_100g: 0,
        sodium_100g: 0,
        sugars_100g: 0,
        veg_percent: 0,
        vitamin_a_beta_k_100g: 0,
        vitamin_a_retinol_100g: 0,
        vitamin_b12_100g: 0,
        vitamin_b1_100g: 0,
        vitamin_b2_100g: 0,
        vitamin_b3_100g: 0,
        vitamin_b5_100g: 0,
        vitamin_b6_100g: 0,
        vitamin_b9_100g: 0,
        vitamin_c_100g: 0,
        vitamin_d_100g: 0,
        vitamin_e_100g: 0,
        vitamin_k1_100g: 0,
        water_100g: 0,
        zinc_100g: 0
    };

    imgInfo.items.forEach(item => {

        const food = item.food[0];
        const nutrition = food.food_info.nutrition;

        for (const nutri in nutriInfo) {
            nutriInfo[nutri] += nutrition[nutri];
        }
    });

    addFoodInfoToDatabase(user_id, recipe_id, nutriInfo);
    return nutriInfo;
}

const addFoodInfoToDatabase = async (user_id, recipe_id, nutriInfo) => {
    const foodAdded = await pool.query(
        "INSERT INTO NutriInfo (user_id, recipe_id, nutrient_dictionary) VALUES ($1, $2, $3) RETURNING *",
        [user_id, recipe_id, nutriInfo]
    );
};




module.exports = router;

