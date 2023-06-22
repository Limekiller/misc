import sys
import os
import requests
import json
import shutil


class PluginDB:

    def __init__(self):
        self.db = self.get_plugin_db()

    def find_most_recent_url_for_version(self, plugin, moodle_version):
        if not plugin in self.db:
            raise Exception(plugin + " not found in Moodle plugins directory!")

        # Iterate through versions going from most to least recent, and return the first one where the moodle version matches
        for version in reversed(self.db[plugin]['versions']):
            for moodle in version['supportedmoodles']:
                if moodle['release'] == moodle_version:
                    return version['downloadurl']

        return self.db[plugin]['versions'][-1]['downloadurl']

    def get_plugin_db(self):
        res = requests.get("https://download.moodle.org/api/1.3/pluglist.php")
        plugin_dict = res.json()

        # Restructure dictionary so that it's indexed by plugin names.
        # So we can access plugin data using e.g. plugin_dict["mod_tab"]
        new_dict = {}
        for plugin in plugin_dict["plugins"]:
            new_dict[plugin["component"]] = plugin

        return new_dict


class Plugin:

    def __init__(self, plugin):
        self.plugin = plugin
        self.plugintype = plugin.split('_')[0]
        self.pluginname = plugin.split('_')[1]

        if self.plugintype not in PLUGIN_DIRS.keys():
            raise Exception("Plugin type " + self.plugintype + " not recognized")
        if os.path.exists(SITE_DIR + '/' + PLUGIN_DIRS[self.plugintype] + '/' + self.pluginname):
            raise Exception(self.plugin + " already in codebase!")

    def download(self):
        plugin_url = PLUGINDB.find_most_recent_url_for_version(self.plugin, VERSION)

        if not plugin_url:
            raise Exception("No download found for " + self.plugin)

        download_path = SITE_DIR + '/' + PLUGIN_DIRS[self.plugintype] + '/plugin.zip'

        res = requests.get(plugin_url, stream=True)
        with open(download_path, 'wb') as out_file:
            shutil.copyfileobj(res.raw, out_file)

        os.chdir(download_path.split('/plugin.zip')[0])
        os.system('unzip plugin.zip > /dev/null 2>&1')
        os.remove(download_path)


PLUGIN_DIRS = {
    'mod': 'mod',
    'antivirus': 'lib/antivirus',
    'assignsubmission': 'mod/assign/submission',
    'assignfeedback': 'mod/assign/feedback',
    'booktool': 'mod/book/tool',
    'customfield': 'customfield/field',
    'datafield': 'mod/data/field',
    'datapreset': 'mod/data/preset',
    'ltisource': 'mod/lti/source',
    'fileconverter': 'files/converter',
    'ltiservice': 'mod/lti/service',
    'quiz': 'mod/quiz/report',
    'quizaccess': 'mod/quiz/accessrule',
    'scormreport': 'mod/scorm/report',
    'workshopform': 'mod/workshop/form',
    'workshopallocation': 'mod/workshop/allocation',
    'workshopeval': 'mod/workshop/eval',
    'block': 'blocks',
    'qtype': 'question/type',
    'qbehaviour': 'question/behaviour',
    'qformat': 'question/format',
    'filter': 'filter',
    'editor': 'lib/editor',
    'atto': 'lib/editor/atto/plugins',
    'tinymce': 'lib/editor/tinymce/plugins',
    'enrol': 'enrol',
    'auth': 'auth',
    'tool': 'admin/tool',
    'logstore': 'admin/tool/log/store',
    'availability': 'availability/condition',
    'calendartype': 'calendar/type',
    'message': 'message/output',
    'format': 'course/format',
    'dataformat': 'dataformat',
    'profilefield': 'user/profile/field',
    'report': 'report',
    'coursereport': 'course/report',
    'gradeexport': 'grade/export',
    'gradeimport': 'grade/import',
    'gradereport': 'grade/report',
    'gradingform': 'grade/grading/form',
    'mnetservice': 'mnet/service',
    'webservice': 'webservice',
    'repository': 'repository',
    'portfolio': 'portfolio',
    'search': 'search/engine',
    'media': 'media/player',
    'plagiarism': 'plagiarism',
    'cachestore': 'cache/stores',
    'cachelock': 'cache/locks',
    'theme': 'theme',
    'local': 'local',
    'assignment': 'mod/assignment/type',
    'dhexport': 'local/datahub/exportplugins',
    'usetenrol': 'local/elisprogram/enrol/userset',
    'user_profilefield': 'user/profile/field'

}

SITE_DIR = None
PLUGIN = None
VERSION = None
PLUGINDB = None


if __name__ == "__main__":

    try:
        SITE_DIR = sys.argv[1]
        PLUGIN = sys.argv[2]
        VERSION = sys.argv[3]
    except:
        print("Usage: python load_plugin.py {wwwroot} {plugin_name} {site.version}")
        exit()

    if SITE_DIR[0] != '/':
        raise Exception("Please use an absolute path")
    if not os.path.exists(SITE_DIR):
        raise Exception("Site directory doesn't exist")
    if not os.path.exists(SITE_DIR + '/version.php'):
        raise Exception("Doesn't appear to be a Moodle directory")

    PLUGINDB = PluginDB()

    # If we were passed a file path, iterate its lines
    if os.path.exists(PLUGIN):
        with open(PLUGIN) as plugin_file:
            for _plugin in plugin_file:
                try:
                    plugin_obj = Plugin(_plugin.strip())
                    plugin_obj.download()
                    print(_plugin.strip() + " added to codebase")
                except Exception as e:
                    print(e)
    else:
        plugin_obj = Plugin(PLUGIN)
        plugin_obj.download()
