from solution import Solution
s = Solution()
assert s.furthestDistanceFromOrigin('L_RL__R') == 3
assert s.furthestDistanceFromOrigin('_R__LL_') == 5
assert s.furthestDistanceFromOrigin('_______') == 7
print("furthest-point-from-origin passed")
