from typing import List

class Solution:
    def earliestTime(self, tasks: List[List[int]]) -> int:
        return min(t[0] + t[1] for t in tasks)

def run_tests():
    sol = Solution()
    assert sol.earliestTime([[1, 4], [2, 1], [3, 5]]) == 3 # task 1 finishes at 2+1=3
    assert sol.earliestTime([[10, 2]]) == 12
    print("All tests passed for 3683.")

if __name__ == "__main__":
    run_tests()
