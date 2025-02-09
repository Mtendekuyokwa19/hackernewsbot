
const pool = require("../db/pool.js");
async function changeFarmerdetails(
  username,
  crop_of_interest_id,
  phone_number,
  area_of_operation_id,

  farmerid,
) {
  await pool.query(
    "UPDATE  farmers SET username=$1,crop_of_interest_id=$2,phone_number=$3,area_of_operation_id=$4   WHERE farmers.id=$5;    ",
    [username, crop_of_interest_id, phone_number, area_of_operation_id, farmerid],
  ).then(() => {
    updateCropAssociation(crop_of_interest_id, farmerid)

  });
}
async function updateCropAssociation(newcrop, farmer_id) {
  await pool.query("UPDATE farmer_crop SET crop_id=$2 WHERE farmer_id=$1", [farmer_id, newcrop])

}
async function updateCropDetail(crop_name, crop_image, crop_id) {


  await pool.query("UPDATE crop SET crop_name=$1, crop_image=$2 WHERE crop.id=$3", [crop_name, crop_image, crop_id])

}
module.exports = {

  changeFarmerdetails,
  updateCropAssociation,
  updateCropDetail

}
