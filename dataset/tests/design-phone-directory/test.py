import json

with open('dataset/problems/design-phone-directory.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
PhoneDirectory = scope['PhoneDirectory']

dir = PhoneDirectory(3)
n1 = dir.get()
assert n1 in [0, 1, 2]
assert dir.check(n1) == False
dir.release(n1)
assert dir.check(n1) == True
print("Passed design-phone-directory tests")
