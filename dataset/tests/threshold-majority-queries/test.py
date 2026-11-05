from collections import defaultdict
import bisect
from typing import List

class Solution:
    def subarrayMajority(self, nums: List[int], queries: List[List[int]]) -> List[int]:
        pos = defaultdict(list)
        for idx, val in enumerate(nums):
            pos[val].append(idx)
        ans = []
        for l, r, threshold in queries:
            if r - l + 1 < threshold:
                ans.append(-1)
                continue
            found = -1
            for val, indices in pos.items():
                if len(indices) < threshold:
                    continue
                cnt = bisect.bisect_right(indices, r) - bisect.bisect_left(indices, l)
                if cnt >= threshold:
                    if found == -1 or val < found:
                        found = val
            ans.append(found)
        return ans

def run_tests():
    sol = Solution()
    res = sol.subarrayMajority([1, 1, 2, 2, 1, 1], [[0, 5, 4], [0, 3, 3], [2, 3, 2]])
    assert res == [1, -1, 2]
    print("All tests passed for 3636.")

if __name__ == "__main__":
    run_tests()
