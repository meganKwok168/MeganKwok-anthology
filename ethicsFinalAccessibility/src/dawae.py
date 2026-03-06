# Main/driver file for final project.
# When run, it should re-process any calculations/operations necessary for the code dimension of your final project.
#
# USAGE:
#   $ python THISFILE
#
# Kwok Megan
# Lam Vincent
# Ethi:CS
# term project
#

import re
import sys

good = True

# file_path = input("pick 'test.html' or 'testFixed.html': ")
file_path = sys.argv[1]

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

heading_class_pattern = re.compile(
    r'<\w+\s+[^>]*class=["\']heading["\'][^>]*>',
    re.IGNORECASE
)

valid_h_pattern = re.compile(
    r'<h[1-6][^>]*>.*?</h[1-6]>',
    re.IGNORECASE | re.DOTALL
)


with open(file_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, start=1):
        if heading_class_pattern.search(line) and not valid_h_pattern.search(line):
            print(f"Line {line_num}: Missing valid <h1>-<h6>: {line.strip()}")

semantic_tags = ['header', 'main', 'footer']
missing_tags = []

for tag in semantic_tags:
    if not re.search(rf'<{tag}[^>]*>.*?</{tag}>', content, re.IGNORECASE | re.DOTALL):
        missing_tags.append(tag)

if len(missing_tags) > 0:
    print(f"Missing tags: {', '.join(missing_tags)}")
    good = False

h1_tags = re.findall(r'<h1[^>]*>', content, re.IGNORECASE)

if len(h1_tags) > 1:
    print(f"Found {len(h1_tags)} <h1> tags. There should only be one per page.")
    good = False

buttons = r'<(div|span)\b[^>]*(onclick|onkeydown|onkeyup|onkeypress)(?!.*role="button").[^>]*>'
button_matches = re.findall(buttons, content, re.IGNORECASE)

if len(button_matches) > 0:
    print("Interactive control must have semantic role:\n")
    for m in button_matches:
        print("  ", m)

        good = False

if good:
    print("the site is accessible")
