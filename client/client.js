const func = require('../services/work_db')
const cli = require('readline-sync')
function menu() {
    let flag = true
    while (flag) {
        choose = cli.question(`
            _________________________________
            choose:
            1. Add a new intelligence report
            2. Show all reports
            3. Search report by ID
            4. Delete report by ID
            5. Edit report by ID
            0. Exit
            _________________________________
            `)
        
        switch (choose) {
            case "1":
                weapons = [cli.question("add weapon that terrorist has: ")]
                flags = true
                while (flags) {
                    more_weapon = cli.question("does he has more weapons? ")
                        if (more_weapon === "yes") {
                        weapon = cli.question("print the weapon: ")
                        weapons.push(weapon)
                        } else if (more_weapon !== "no") {
                            throw new Error("you need to print yes or no! ");
                        } else {
                            flags = false
                        }
                    }
                text = cli.question("type the text that you want to add to database: ")
                id = cli.question("print terrorist id or enter if you want hard id: ")
                t_name = cli.question("type the name of terrorist or enter if he has no name: ")
                if (!id && !t_name) {
                    report = func.create_report_obj(weapons, text)
                    func.save_db(report)
                } else if (!id) {
                    report = func.create_report_obj(weapons, text, null, t_name)
                    func.save_db(report)
                } else if (!t_name) {
                    report = func.create_report_obj(weapons, text, id)
                    func.save_db(report)
                } else {
                    report = func.create_report_obj(weapons, text, id, t_name)
                    func.save_db(report)
                }
                break
            
            case "2":
                console.log(func.getting_all_reports(func.database));
                break
            
            case "3":
                id = cli.question("print the id: ")
                report = func.search_report_by_id(id)
                console.log(report);
                break

            case "4":
                id = cli.question("print the id: ")
                func.delete_report_by_id(id)
                console.log("the report deleted successfuly");
                break
            
            case "5":
                update_obj = {}
                time = cli.question("how many key you want to update? ")
                for (let i = 0; i < time; i ++) {
                    key = cli.question("print the key you want to update: ")
                    value = cli.question("print the value you want to update: ")
                    update_obj[key] = value
                }
                id = cli.question("print the id: ")
                func.update_report(id, update_obj)
                console.log("updated successfuly.");
                break
            
            case "0":
                flag = false
        }
    }
}

module.exports = menu