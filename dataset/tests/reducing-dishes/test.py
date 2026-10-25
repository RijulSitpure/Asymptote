class Solution:
    def maxSatisfaction(self, satisfaction: list[int]) -> int:
        satisfaction.sort(reverse=True)
        total = 0
        running_sum = 0
        for s in satisfaction:
            running_sum += s
            if running_sum <= 0:
                break
            total += running_sum
        return total

def test():
    sol = Solution()
    assert sol.maxSatisfaction([-1,-8,0,5,-9]) == 14, "test 1 failed"
    assert sol.maxSatisfaction([4,3,2]) == 20, "test 2 failed"
    assert sol.maxSatisfaction([-1,-4,-5]) == 0, "test 3 failed"
    print("✓ reducing-dishes passed")

if __name__ == "__main__":
    test()
