import json

with open('dataset/problems/lfu-cache.json') as f:
    prob = json.load(f)

scope = {}
exec(prob['solutions'][0]['code'], scope)
LFUCache = scope['LFUCache']

lfu = LFUCache(2)
lfu.put(1, 1)
lfu.put(2, 2)
assert lfu.get(1) == 1
lfu.put(3, 3)
assert lfu.get(2) == -1
assert lfu.get(3) == 3
lfu.put(4, 4)
assert lfu.get(1) == -1
assert lfu.get(3) == 3
assert lfu.get(4) == 4
print("Passed lfu-cache tests")
