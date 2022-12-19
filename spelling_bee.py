# New York Times "Spelling Bee" puzzle solver
import sys


def search_wordlist(prefix, wordlist):
    """
    Given a prefix and a list of words, return words that start with said prefix

    Parameters:
    prefix (string): The prefix to search for
    wordlist (array): An array of words in which to search

    Returns:
    array: An array of words that start with the given prefix
    """
    matched_words = []
    for word in wordlist:
        if word[:len(prefix)] == prefix:
            matched_words.append(word)
        continue
    return matched_words


def generate_words(letters, word='', words=set(), wordlist=None):
    """
    Given a set of letters, return all valid words that can be made, including duplicate letters, up to length 10

    This is a recursive function that finds all combinations of letters that match an existing list of words.
    Considering all possible combinations in general is far too inefficient; this way our problem space is reduced
    to only valid English words, instead of all letter combinations.

    Parameters:
    letters (array): The letters to build words from
    word (string): The current word that we're building
    words (set): All the words we've found so far
    wordlist (array): A list of words to search in for valid matches

    Returns:
    array: All possible, valid words that can be made from the given letters
    """

    if not wordlist:
        with open('words.txt') as f:
            wordlist = f.read().splitlines()

    # check if any words in our wordlist start with the prefix we're working with
    # if not, forget about this path
    potential_words = search_wordlist(word, wordlist)
    if not potential_words:
        return

    if len(word) >= 4:
        if word in potential_words:
            words.add(word)

    if len(word) >= 10:
        return

    for letter in letters:
        word += letter
        generate_words(letters, word, words, potential_words)

        # after we've exhaused a path, remove the last letter of the current word
        # so we can explore from the parent node
        word = word[:-1]

    return words


def check_words(wordlist, main_letter):
    """
    Given a list of words, return those that contain the "main" letter

    Parameters:
    wordlist (array): An array of words
    main_letter (string): The letter to look for in each word

    Returns:
    array: A list of words that contain the main_letter
    """
    words = []
    for word in wordlist:
        if main_letter in word:
            words.append(word)
    return words


def print_help():
    """
    Print the help message
    """
    print("Usage: spelling_bee [LETTERS] [MAIN LETTER]\ne.g. `spelling_bee cinhwgt t`")
    exit()


if __name__ == '__main__':
    if (len(sys.argv) != 3):
        print_help()

    letters = [*sys.argv[1]]
    main_letter = sys.argv[2]

    all_words = generate_words(letters)
    matching_words = check_words(all_words, main_letter)

    for word in matching_words:
        print(word)
