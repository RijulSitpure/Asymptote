from typing import List

class Solution:
    def maxProfitAssignment(self, difficulty: List[int], profit: List[int], worker: List[int]) -> int:
        jobs = sorted(zip(difficulty, profit))
        worker.sort()
        ans = 0
        max_profit = 0
        i = 0
        n = len(jobs)

        for ability in worker:
            while i < n and jobs[i][0] <= ability:
                if jobs[i][1] > max_profit:
                    max_profit = jobs[i][1]
                i += 1
            ans += max_profit

        return ans

def test():
    sol = Solution()
    d1 = [2, 4, 6, 8, 10]
    p1 = [10, 20, 30, 40, 50]
    w1 = [4, 5, 6, 7]
    assert sol.maxProfitAssignment(d1, p1, w1) == 100, "test 1 failed"
    print("✓ most-profit-assigning-work passed")

if __name__ == "__main__":
    test()
