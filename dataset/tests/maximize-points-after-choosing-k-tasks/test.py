class Solution:
    def maxPoints(self, primary: list[int], secondary: list[int], k: int, limit: int) -> int:
        tasks = []
        for p, s in zip(primary, secondary):
            tasks.append((p, max(0, s - p)))
        tasks.sort(key=lambda x: -(x[0] + x[1]))
        
        selected = tasks[:k]
        base_sum = sum(p for p, _ in selected)
        bonuses = sorted([b for _, b in selected], reverse=True)
        return base_sum + sum(bonuses[:limit])

def run_tests():
    sol = Solution()
    assert sol.maxPoints([10, 20, 30], [15, 25, 35], 2, 1) == 55
    assert sol.maxPoints([5, 5], [10, 10], 2, 2) == 20
    print("All tests passed for 3767.")

if __name__ == "__main__":
    run_tests()
