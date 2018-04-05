var promise = require('bluebird');

var options = {
	promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = '';
var db = pgp(connectionString);
//Contracts

function ac(req, res, next) {
	  department_uuid = (req.params.department_uuid != undefined) ? req.params.department_uuid : "0"
	  contractor_uuid = (req.params.contractor_uuid != undefined) ? req.params.contractor_uuid : "0" 
	  console.log("Department: " + department_uuid)
	  console.log("Contractor: " + contractor_uuid)
	if (department_uuid == "0" && contractor_uuid == "0"){
		ac_all(res,next)
	}else if ( department_uuid == "0" && contractor_uuid != "0"){
		ac_contractor(contractor_uuid,res,next)
	}else if ( department_uuid != "0" && contractor_uuid =="0"){
		ac_department(department_uuid,res,next)
	
	}else{
		ac_d_c(department_uuid,contractor_uuid,res,next)
	}
	
}

function ac_d_c(department_uuid,contractor_uuid,res,next){

	  db.any('select *,contract.uuid as contract_uuid, contractor.name as contractor_name, department.name as department_name,contractor.uuid as contractor_uuid,department.uuid as department_uuid from contract join department on contract.department_id = department.id join contractor on contract.contractor_id = contractor.id where department.uuid = $1 and contractor.uuid = $2',[department_uuid,contractor_uuid])
	    .then(function (data) {
		res.status(200).json({
			      status: 'success',
			      data: data,
			      message: 'Retrieved ALL contracts'
			    });
		        })
			.catch(function (err) {
			  return next(err);
		        });
}
function ac_department(department_uuid,res,next){

	  db.any('select *, contract.uuid as contract_uuid, contractor.name as contractor_name, department.name as department_name,contractor.uuid as contractor_uuid,department.uuid as department_uuid from contract join department on contract.department_id = department.id join contractor on contract.contractor_id = contractor.id where department.uuid = $1',department_uuid)
	    .then(function (data) {
		res.status(200).json({
			      status: 'success',
			      data: data,
			      message: 'Retrieved ALL contracts'
			    });
		        })
			.catch(function (err) {
			  return next(err);
		        });
}
function ac_contractor(contractor_uuid,res,next){

	  db.any('select *, contract.uuid as contract_uuid, contractor.uuid as contractor_uuid, contractor.name as contractor_name, department.name as department_name,contractor.uuid as contractor_uuid,department.uuid as department_uuid from contract join department on contract.department_id = department.id join contractor on contract.contractor_id = contractor.id where contractor.uuid = $1',contractor_uuid)
	    .then(function (data) {
		res.status(200).json({
			      status: 'success',
			      data: data,
			      message: 'Retrieved ALL contracts'
			    });
		        })
			.catch(function (err) {
			  return next(err);
		        });
}
function ac_all(res,next){

	  db.any('select *, contract.uuid as contract_uuid, contractor.uuid as contractor_uuid, contractor.name as contractor_name, department.name as department_name,contractor.uuid as contractor_uuid,department.uuid as department_uuid from contract join department on contract.department_id = department.id join contractor on contract.contractor_id = contractor.id')
	    .then(function (data) {
		res.status(200).json({
			      status: 'success',
			      data: data,
			      message: 'Retrieved ALL contracts'
			    });
		        })
			.catch(function (err) {
			  return next(err);
		        });
}



//

//Works With
function ww(req, res, next) {
	  department_uuid = (req.params.department_uuid != undefined) ? req.params.department_uuid : "0"
	  contractor_uuid = (req.params.contractor_uuid != undefined) ? req.params.contractor_uuid : "0" 
	  console.log("Department: " + department_uuid)
	  console.log("Contractor: " + contractor_uuid)
	if (department_uuid == "0" && contractor_uuid == "0"){
		ww_all(res,next)
	}else if ( department_uuid == "0" && contractor_uuid != "0"){
		ww_contractor(contractor_uuid,res,next)
	}else if ( department_uuid != "0" && contractor_uuid =="0"){
		ww_department(department_uuid,res,next)
	
	}else{
		ww_d_c(department_uuid,contractor_uuid,res,next)
	}
	
}

function ww_d_c(department_uuid,contractor_uuid,res,next){

	  db.any('select contractor.name as contractor_name, department.name as department_name,contractor.uuid as contractor_uuid,department.uuid as department_uuid, count(*) from contract join department on contract.department_id = department.id join contractor on contract.contractor_id = contractor.id where department.uuid = $1 and contractor.uuid = $2 group by contractor.name, department.name, contractor.uuid, department.uuid',[department_uuid,contractor_uuid])
	    .then(function (data) {
		res.status(200).json({
			      status: 'success',
			      data: data,
			      message: 'Retrieved ALL contracts'
			    });
		        })
			.catch(function (err) {
			  return next(err);
		        });
}
function ww_department(department_uuid,res,next){

	  db.any('select contractor.name as contractor_name, department.name as department_name,contractor.uuid as contractor_uuid,department.uuid as department_uuid, count(*) from contract join department on contract.department_id = department.id join contractor on contract.contractor_id = contractor.id where department.uuid = $1 group by contractor.name, department.name, contractor.uuid, department.uuid',department_uuid)
	    .then(function (data) {
		res.status(200).json({
			      status: 'success',
			      data: data,
			      message: 'Retrieved ALL contracts'
			    });
		        })
			.catch(function (err) {
			  return next(err);
		        });
}
function ww_contractor(contractor_uuid,res,next){

	  db.any('select contractor.name as contractor_name, department.name as department_name,contractor.uuid as contractor_uuid,department.uuid as department_uuid, count(*) from contract join department on contract.department_id = department.id join contractor on contract.contractor_id = contractor.id where contractor.uuid = $1 group by contractor.name, department.name, contractor.uuid, department.uuid',contractor_uuid)
	    .then(function (data) {
		res.status(200).json({
			      status: 'success',
			      data: data,
			      message: 'Retrieved ALL contracts'
			    });
		        })
			.catch(function (err) {
			  return next(err);
		        });
}
function ww_all(res,next){

	  db.any('select contractor.name as contractor_name, department.name as department_name,contractor.uuid as contractor_uuid,department.uuid as department_uuid, count(*) from contract join department on contract.department_id = department.id join contractor on contract.contractor_id = contractor.id group by contractor.name, department.name, contractor.uuid, department.uuid')
	    .then(function (data) {
		res.status(200).json({
			      status: 'success',
			      data: data,
			      message: 'Retrieved ALL contracts'
			    });
		        })
			.catch(function (err) {
			  return next(err);
		        });
}

function createMeta(c,d,callback){
	createContractor(c,d).then(function(obj){
		console.log("creating contractor: ",obj)
		return createDepartment(obj)
	}).then(function(obj){
		console.log("creating department:", obj);
		callback(obj);
	})
	
}

module.exports = {
	ac:ac,
	ww: ww
};
