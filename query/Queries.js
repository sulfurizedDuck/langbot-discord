module.exports = {
  insertUnit: "INSERT INTO units(name, atk_bond, def_bond) VALUES($1, $2, $3);",
  getAllUnits: "SELECT * FROM units;",
  getUnitByName: "SELECT * FROM units WHERE LOWER(name) = LOWER($1) LIMIT 1;",
  getUnitByNickname: "SELECT units.* FROM units JOIN nicknames ON units.id=nicknames.unit_id WHERE LOWER(nicknames.nickname) = LOWER($1) LIMIT 1;",
  insertNickname: "INSERT INTO nicknames(unit_id, nickname) VALUES($1, $2);",
  getNicknamesForUnit: "SELECT nicknames.* FROM nicknames JOIN units ON nicknames.unit_id = units.id WHERE LOWER(units.name) = LOWER($1)",
  getAtkBondLockedBy: "SELECT name FROM units WHERE LOWER(atk_bond) = LOWER($1)",
  getDefBondLockedBy: "SELECT name FROM units WHERE LOWER(def_bond) = LOWER($1)",
};