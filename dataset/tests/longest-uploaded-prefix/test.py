from solution import LUPrefix
server = LUPrefix(4)
server.upload(3)
assert server.longest() == 0
server.upload(1)
assert server.longest() == 1
server.upload(2)
assert server.longest() == 3
print("All tests passed for longest-uploaded-prefix!")
