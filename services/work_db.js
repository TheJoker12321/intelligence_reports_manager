const database = require("../db/database")
const nanoid =  require('nanoid')


function create_report_obj(weapons , text,  id, t_name = "Muhammad") {
    if (!id) {
        id = nanoid.nanoid()
    }
    if (typeof id !== "number" && typeof id !== "string") {
        throw new Error("id need to be string or number")
    }
    
    for (const obj of database) {
        if (id === obj.id) {
            throw new Error("id need to be unique")
        }
    }
    return {id: id, name: t_name, weapons: weapons, text: text}
}

function save_db(report_obj) {
    database.push(report_obj)
}

function getting_all_reports(db){
    db.sort((a, b) => a.id.localeCompare(b.id))
    return db
}

function sorted_by_field(field) {
    if (!(field in database[0])) {
        throw new Error("field has to be key");
    }
    return database.sort((a, b) => a[field].localeCompare(b[field]))

}

function search_report_by_id(id) {
    for (const repo of database) {
        if (repo.id === id) {
            return repo
        } 
    }
    throw new Error("report not definded");
}


function delete_report_by_id(id) {
    for (let idx = 0; idx < database.length; idx ++) {
        if (database[idx].id === id) {
            database.splice(idx, 1)
            return
        }
    }
    throw new Error("report not definded");
}

function update_report(id, update) {
    for (const key of Object.keys(update)) {
        if (!(key in database[0]))
            throw new Error("key not found");   
    }
    for (let idx = 0; idx < database.length; idx ++) {
        if (database[idx].id === id) {
            for (const key of Object.keys(update)) {
                database[idx][key] = update[key]
            }
            return
        }
    }
    throw new Error("id not found");
}





module.exports  = {database, 
    create_report_obj, 
    save_db,
    getting_all_reports,
    sorted_by_field, 
    search_report_by_id, 
    delete_report_by_id, 
    update_report
}