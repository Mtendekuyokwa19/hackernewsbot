const pool = require("../db/pool");

async function getallcrops() {
  let { rows } = await pool.query("SELECT crop_name,crop_image FROM crop");
  return rows;
}
async function getallfarmers() {
  let { rows } = await pool.query("SELECT username  FROM farmers");
  return rows;
}
async function getallbuyers() {
  let { rows } = await pool.query("SELECT username FROM buyers");
  return rows;
}
async function getcropbyname(crop_name) {
  let { rows } = await pool.query("SELECT * FROM crop WHERE crop_name=$1", [crop_name])
  return rows

}

async function getareaidbyname(area) {
  let { rows } = await pool.query(
    "SELECT DISTINCT id FROM area_of_operation WHERE $1=district",
    [area],
  );
  return rows;
}
async function getFarmersforCrop(cropname) {
  let { rows } = await pool.query(
    "SELECT * FROM farmers JOIN farmer_crop ON farmers.id=farmer_id JOIN crop ON crop_of_interest_id=crop.id  JOIN area_of_operation ON area_of_operation_id=area_of_operation.id WHERE crop.crop_name = $1",
    [cropname.toString()]
  );
  return rows;
}
async function getFarmerbyusername(username) {

  let { rows } = await pool.query(
    "SELECT * FROM farmers WHERE farmers.username= $1",
    [username]);
  console.log(rows)
  return rows;


}
async function getCropforFarmers(farmerName) {
  let { rows } = await pool.query(
    "SELECT farmers.username ,crop_name FROM farmers JOIN farmer_crop ON farmers.id=farmer_id JOIN crop ON crop_of_interest_id=crop.id  WHERE $1 = farmer.username ",
    [farmerName.toLowerCase()],
  );
  return rows;
}
async function getfarmersinarea(areaName) {
  let { rows } = await pool.query(
    "SELECT farmers.username FROM farmers JOIN area_of_operation ON area_of_operation_id=farmers.area_of_operation_id  WHERE $1 = area_of_operation.area_name OR $1=area_of_operation.district   ",
    [areaName.toLowerCase()],
  );
  return rows;
}

async function getcropsinarea(areaName) {
  let { rows } = await pool.query(
    "SELECT DISTINCT crop.crop_name FROM crop JOIN farmers ON farmers.crop_of_interest_id=crop.id JOIN area_of_operation ON area_of_operation_id=farmers.area_of_operation_id  WHERE $1 = area_of_operation.area_name OR $1=area_of_operation.district   ",
    [areaName.toLowerCase()],
  );
  return rows;
}

async function getbuyersinarea(areaName) {
  let { rows } = await pool.query(
    "SELECT DISTINCT buyers.username FROM buyers JOIN area_of_operation ON buyers.area_of_operation_id=area_of_operation.id  WHERE $1 = area_of_operation.area_name OR $1=area_of_operation.district   ",
    [areaName.toLowerCase()],
  );
  return rows;
}
//FIX: this returns the wrong data
async function getbuyerscrop(cropName) {
  let { rows } = await pool.query(
    "SELECT buyers.username ,crop_name FROM buyers JOIN buyer_crop ON buyers.id=buyer_crop.buyer_id JOIN crop ON crop.id=buyer_crop.crop_id  WHERE $1 = crop_name ",
    [cropName.toLowerCase()],
  );
  return rows;
}
async function getcroplist() {

  let { rows } = await pool.query("SELECT crop_name FROM crop");
  return rows;

}
async function getnumberoffarmers() {
  let { rows } = await pool.query("SELECT COUNT(username)  FROM farmers");
  return rows[0].count;
}
async function getfarmerid(username) {

  let { rows } = await pool.query("SELECT id FROM farmers WHERE $1=username", [username]);
  return rows


}

async function getnumberofbuyers() {
  let { rows } = await pool.query("SELECT COUNT(username)  FROM buyers");
  return rows[0].count;
}
async function getnumberofcrops() {
  let { rows } = await pool.query("SELECT COUNT(crop_name)  FROM crop");
  return rows[0].count;
}

async function getallfarmersFortable() {
  let { rows } = await pool.query(
    "SELECT *  FROM farmers JOIN crop ON farmers.crop_of_interest_id=crop.id JOIN area_of_operation ON farmers.area_of_operation_id=area_of_operation.id",
  );

  return rows;
}
async function getcropidbyname(crop_name) {

  let { rows } = await pool.query("SELECT id  FROM crop WHERE $1=crop_name ", [crop_name]);

  return rows;

}

async function getallplaces() {

  let { rows } = await pool.query("SELECT district  FROM area_of_operation ",);
  return rows
}
async function getpassword() {
  let { rows } = await pool.query("SELECT *  FROM password ");
  return rows;
}
module.exports = {
  getnumberoffarmers,
  getnumberofcrops,
  getnumberofbuyers,
  getallcrops,
  getareaidbyname,
  getallfarmersFortable,
  getpassword,
  getcroplist,
  getcropidbyname,
  getallplaces
  , getFarmersforCrop
  , getfarmerid
  , getFarmerbyusername,
  getcropbyname,

}

