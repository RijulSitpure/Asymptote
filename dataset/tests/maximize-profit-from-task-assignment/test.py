from collections import defaultdict

class Solution:
    def maxProfit(self, workers: list[int], tasks: list[list[int]]) -> int:
        d = defaultdict(list)
        for skill, profit in tasks:
            d[skill].append(profit)
        for skill in d:
            d[skill].sort()
            
        ans = 0
        for w in workers:
            if d[w]:
                ans += d[w].pop()
                
        max_rem = 0
        for skill, arr in d.items():
            if arr:
                max_rem = max(max_rem, arr[-1])
                
        return ans + max_rem

def test_maximize_profit_from_task_assignment():
    sol = Solution()
    assert sol.maxProfit([1, 2], [[1, 5], [2, 10], [1, 20]]) == 35
    assert sol.maxProfit([1], [[2, 10], [3, 20]]) == 20

if __name__ == '__main__':
    test_maximize_profit_from_task_assignment()
    print('All tests passed.')
