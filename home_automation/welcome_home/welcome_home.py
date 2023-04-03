# Python script that scans the network for mac addresses to determine who is physically home (connected to wifi)
# If somebody hasn't been seen in a while and is found again, audibly speak a welcome message

#!/bin/python

import nmap
import os
import time

# "SO:ME:MA:CA:DD:RE:SS": {"name": "Firstname", "resident" True/False}
mac_table = {
    "BA:7A:79:2F:8D:26": {"name": "Bryce", "resident": True},
}


def get_macs():
    # Return a list of all current connected macs
    nm = nmap.PortScanner()
    cidr2='192.168.0.0/24'

    macs = []
    results = nm.scan(hosts=cidr2, arguments='-sP')
    for ip in results['scan'].keys():
        addresses = results['scan'][ip]['addresses']
        if 'mac' in addresses.keys():
            macs.append(addresses['mac'])

    return macs


def get_new_macs(all_macs, current_macs):
    # Return a list of all macs that aren't currently recorded as being connected
    new_macs = []
    for mac in all_macs:
        if mac not in current_macs.keys():
            new_macs.append(mac)

    return new_macs


def build_string(new_macs):
    # Based on the new mac list and the mac_table, build a relevant welcome string

    # Is anyone that just connected not a resident? Change the sentence contextually
    string = "Welcome home, "
    for mac in new_macs:
        if mac in mac_table.keys() and not mac_table[mac]["resident"]:
            string = "Welcome, "

    # Get a list of folks
    people = []
    for mac in new_macs:
        if mac in mac_table.keys():
            people.append(mac_table[mac]["name"])

    # If there's only one, just return right away
    if len(people) == 1:
        return string + people[0]
    
    # Otherwise, build a string with commas in the right places
    for index, person in enumerate(people):
        if index == len(people) - 1:
            return string + "and " + person 
        string += person + ", "

    return ""


def update_current_macs(all_macs, current_macs):
    # Maintain the "current mac" list based on who we've found in the most recent scan

    # Add new macs
    for mac in all_macs:
        if mac not in current_macs.keys():
            current_macs[mac] = {"rounds_missing": 0}

    # Go through old macs and remove them if we haven't seen them in a while. Otherwise, just increment the counter
    macs_to_remove = []
    for mac in current_macs.keys():
        if mac not in all_macs:
            if current_macs[mac]["rounds_missing"] >= 10:
                macs_to_remove.append(mac)
            else:
                current_macs[mac]["rounds_missing"] += 1
        else:
            current_macs[mac]["rounds_missing"] = 0

    for mac in macs_to_remove:
        del current_macs[mac]
    
    return current_macs


# "SO:ME:MA:CA:DD:RE:SS": {"rounds_missing": 0-10}
current_macs = {}

while True:
    all_macs = get_macs()
    new_macs = get_new_macs(all_macs, current_macs)

    string = build_string(new_macs)
    if string:
        time.sleep(30)
        os.system("espeak '" + string + "'")

    current_macs = update_current_macs(all_macs, current_macs)
    print(current_macs)
