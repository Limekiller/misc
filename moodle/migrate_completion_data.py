# Given a list of usernames, migrate the user's activity completion data between two sites

import mysql.connector
import hashlib
import json
import requests

class User:
    """
    User objects contain all the information representing one user on both the old AND the new site

    @attribute new_id: The ID of the user in the new site
    @attribute username: The username of the user
    @attribute old_id: The ID of the user in the old site
    @attribute enrolled_courses: A dictionary containing lists of enrolled course IDs on the old and new sites
    """
    def __init__(self, new_id, username):
        self.new_id = new_id
        self.username = username

    def fetch_old_id(self):
        """
        Fetch and set the ID from the old site based on username

        @return: True if user was found, false if not
        """
        old_db_cursor.execute("SELECT id FROM mdl_user WHERE username = %s", (self.username,))
        result = old_db_cursor.fetchone()
        if result is not None:
            self.old_id = result[0]
            return True
        return False


def save_users_to_file(user_array):
    file = open('completed_users.json', 'w')
    json.dump(user_array, file)
    file.close()


def build_users_string():
    user_set = set()
    with open("users") as f:
        for line in f:
            user_set.add(line.strip())
    return "'" + "', '".join(user_set) + "'"


old_db = mysql.connector.connect(
    host="",
    user="",
    password="",
    database=""
)

new_db = mysql.connector.connect(
    host="",
    user="",
    password="",
    database=""
)

old_db_cursor = old_db.cursor(prepared=True)
new_db_cursor = new_db.cursor(prepared=True)

users_string = build_users_string()
new_db_cursor.execute("SELECT id, username FROM mdl_user WHERE deleted = 0 and username IN (" + users_string + ") ORDER BY username")
new_db_users = new_db_cursor.fetchall()

users = {}
completed_users = []

for user_tuple in new_db_users:

    # Fetch user, add to user dict
    user = User(user_tuple[0], user_tuple[1])
    users[user_tuple[1]] = user

    # Skip fetching enrolled courses if not found in old site
    if not user.fetch_old_id():
        print(f"Could not find match for {user.username}")
        continue

    with open('completed_users.json') as f:
        data = json.load(f)
    if user.username in data:
        completed_users.append(user.username)
        print(f'{user.username} found in completed users, skipping')
        f.close()
        continue

    print(user.username)

    # Get all old activity data
    old_db_cursor.execute("SELECT * FROM mdl_course_modules_completion WHERE userid = %s", (user.old_id,))
    results = old_db_cursor.fetchall()

    for module_completion_row in results:
        old_db_cursor.execute("""
            SELECT cmc.coursemoduleid, cm.course, cm.instance, m.name, cm.module FROM mdl_course_modules_completion cmc
            JOIN mdl_course_modules cm on cm.id = cmc.coursemoduleid
            JOIN mdl_modules m on m.id = cm.module
            WHERE cmc.id = %s""",
        (module_completion_row[0],))
        results = old_db_cursor.fetchall()

        coursemoduleid = results[0][0]
        courseid = results[0][1]

        instance = results[0][2]
        type = results[0][3]
        moduletypeid = results[0][4]

        old_db_cursor.execute("SELECT name FROM mdl_" + type + " WHERE id = %s", (instance,))
        results = old_db_cursor.fetchall()
        try:
            modulename = results[0][0]
        except:
            file = open('error.log', 'a')
            file.writelines(f"Can't find a matching module? Maybe it was deleted.")
            file.close()
            continue

        old_db_cursor.execute("SELECT shortname FROM mdl_course WHERE id = %s", (courseid,))
        results = old_db_cursor.fetchall()
        courseshortname = results[0][0]

        new_db_cursor.execute("""
            SELECT cm.id FROM mdl_course_modules cm
            JOIN mdl_course c ON cm.course = c.id
            JOIN mdl_modules m ON m.id = cm.module
            JOIN mdl_""" + type + """ mmm ON mmm.id = cm.instance
            WHERE c.shortname = %s and mmm.name = %s AND m.name = '""" + type + """'
        """, (courseshortname,modulename,))
        results = new_db_cursor.fetchall()
        try:
            coursemoduleid = results[0][0]
        except:
            file = open('error.log', 'a')
            file.writelines(f"Can't find matching module of type {type} with name {modulename} in course {courseshortname}")
            file.close()
            continue

        new_db_cursor.execute(
                "REPLACE INTO mdl_course_modules_completion (coursemoduleid, userid, completionstate, overrideby, timemodified) VALUES (%s, %s, %s, %s, %s)",
                (coursemoduleid,user.new_id,module_completion_row[3],module_completion_row[5],module_completion_row[6])
        )

        new_db_cursor.execute("SELECT id FROM mdl_course WHERE shortname = %s", (courseshortname,))
        results = new_db_cursor.fetchall()
        new_course_id = results[0][0]
        requests.get(f"https://{domain}/webservice/rest/server.php?wstoken={token}&wsfunction=enrol_manual_enrol_users&moodlewsrestformat=json&enrolments[0][userid]={user.new_id}&enrolments[0][courseid]={new_course_id}&enrolments[0][roleid]=5")

       # modulehash = hashlib.md5((courseshortname + modulename + type).encode('utf-8')).hexdigest()
       # if modulehash not in modules:
       #     modules[modulehash] = module
       # else:
       #     file = open('error.log', 'a')
       #     file.writelines(f'Duplicate hash {modulehash} found for course {courses[module.data["old"]["course"]].shortname} and module {module.name}!')
       #     file.close()

    new_db.commit()

    completed_users.append(user.username)
    save_users_to_file(completed_users)
