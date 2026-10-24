class Solution:
    def dietPlanPerformance(self, calories: list[int], k: int, lower: int, upper: int) -> int:
        curr = sum(calories[:k])
        points = 0
        if curr < lower:
            points -= 1
        elif curr > upper:
            points += 1
        
        for i in range(k, len(calories)):
            curr += calories[i] - calories[i - k]
            if curr < lower:
                points -= 1
            elif curr > upper:
                points += 1
        return points

def test():
    sol = Solution()
    assert sol.dietPlanPerformance([1,2,3,4,5], 1, 3, 3) == 0, "test 1 failed"
    assert sol.dietPlanPerformance([3,2], 2, 0, 1) == 1, "test 2 failed"
    assert sol.dietPlanPerformance([6,5,0,0], 2, 1, 5) == 0, "test 3 failed"
    print("✓ diet-plan-performance passed")

if __name__ == "__main__":
    test()
