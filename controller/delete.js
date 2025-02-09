let pool = require("../db/pool.js");
const { getcropidbyname } = require("./get.js")
async function removeFarmer(username, phone_number) {
  await pool.query(
    "DELETE FROM farmers WHERE username = $1 AND phone_number = $2;",
    [username, phone_number],
  );
}

async function removeBuyer(username, phone_number) {
  await pool.query(
    "DELETE FROM buyers WHERE username = $1 AND phone_number = $2;",
    [username, phone_number],
  );
}
async function clearfarmers() {

  await pool.query(
    "DELETE FROM farmers ",
  );

}
async function removefarmer_crop(farmerid) {

  await pool.query(
    "DELETE FROM farmer_crop WHERE farmer_id=$1 ", [farmerid]
  );

}

//FIX: fails to delete
async function removeBuyerOfCrop(crop_name) {
  let { rows } = await pool.query(
    "DELETE   FROM buyers JOIN buyer_crop ON buyers.id= buyer_crop.buyer_id JOIN crop ON buyer_crop.crop_id = crop.id   WHERE  crop.crop_name= $1 ;",
    [crop_name],
  );
}

async function removeFarmercrop() {
  let { rows } = await pool.query(
    "DELETE   FROM farmer_crop  ;",
  );
}

async function cropbyid(id) { }
async function farmers_cropbycropid(id) { }
async function farmersbycropid(id) { }
async function removeCrop(crop_name) {
  getcropidbyname(crop_name).then(async (crop) => {
    await pool.query("DELETE FROM farmers WHERE crop_of_interest_id=$1", [crop[0].id])

    await pool.query("DELETE FROM farmer_crop WHERE crop_id=$1", [crop[0].id])

    await pool.query("DELETE FROM crop WHERE crop.id=$1", [crop[0].id])


  })

}
//TODO: removefarmerOfcrop
//TODO: removefarmerOfcrop
//TODO: removefarmerOfarea
//TODO: removeBuyerofarea
//

module.exports = {
  removeFarmer,
  removefarmer_crop,
  removeCrop
}
