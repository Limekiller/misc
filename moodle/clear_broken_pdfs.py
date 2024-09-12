import sys
import os
import mysql.connector

if __name__ == "__main__":

    if 1 not in range(len(sys.argv)) or 2 not in range(len(sys.argv)):
        print("Usage: clear_broken_pdfs.py {wwwroot} {user}")
        exit()
    wwwroot = sys.argv[1]
    user = sys.argv[2]

    if not os.path.exists(wwwroot):
        raise Exception("Moodle path not found")

    if not os.path.isfile(wwwroot + '/version.php'):
        raise Exception("Path does not appear to be a Moodle installation")

    config_file = open(wwwroot + '/config.php', 'r').read()
    dbinfo = {}
    for item in ['dbhost', 'dbname', 'dbuser', 'dbpass', 'prefix']:
        dbinfo[item] = config_file.split("CFG->" + item)[1].split("'")[1].split("'")[0]

    db = mysql.connector.connect(
        host=dbinfo['dbhost'],
        user=dbinfo['dbuser'],
        password=dbinfo['dbpass'],
        database=dbinfo['dbname'],
    )
    cursor = db.cursor()

    cursor.execute(f"""
        SELECT * FROM {dbinfo['prefix']}file_conversion WHERE status IN (1, -1);
    """)
    results = cursor.fetchall()

    fd_confirm = input(f"About to delete {len(results)} files. Ok? y/n: ")
    if fd_confirm != 'y':
        exit()

    print('Deleting files')
    os.chdir(wwwroot)
    for failed_file in results:
        sourcefileid = failed_file[4]

        # Get all files attached to this conversion
        cursor.execute(f"""
            SELECT f.id FROM {dbinfo['prefix']}files f
            JOIN {dbinfo['prefix']}file_conversion fc
            JOIN {dbinfo['prefix']}files f2 ON f2.id = fc.sourcefileid
            JOIN {dbinfo['prefix']}context mc ON mc.id = f2.contextid
            JOIN {dbinfo['prefix']}course_modules cm ON cm.id = mc.instanceid
            JOIN {dbinfo['prefix']}assign_grades ag ON ag.userid = f2.userid AND ag.assignment = cm.instance
            WHERE fc.sourcefileid = %s AND f.itemid = ag.id AND f.contextid = f2.contextid
        """, [sourcefileid])
        results = cursor.fetchall()

        # Delete these files using moosh
        for converted_file in results:
            os.system(f"sudo -u {user} moosh file-delete {converted_file[0]}")

    fc_confirm = input('Done! Are you ready to delete the file conversion records? y/n: ')

    if fc_confirm == 'y':
        # Remove all broken file_conversion records from the db
        cursor.execute(f"""
            DELETE FROM {dbinfo['prefix']}file_conversion WHERE status = -1;
        """)
        db.commit()

        print('Done!')
    else:
        print('file conversion records not deleted')
