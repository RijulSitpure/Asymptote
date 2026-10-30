from solution import Solution

s = Solution()
assert s.waysToPartition([2,-1,2], 3) == 1
assert s.waysToPartition([0,0,0], 1) == 2
assert s.waysToPartition([22,4,-25,-20,-15,15,-16,7,19,-10,0,-13,-14], -33) == 4
print('OK')