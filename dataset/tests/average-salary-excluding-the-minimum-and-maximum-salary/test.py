class Solution:
    def average(self, salary: list[int]) -> float:
        return (sum(salary) - min(salary) - max(salary)) / (len(salary) - 2)

def test():
    sol = Solution()
    assert sol.average([4000,3000,1000,2000]) == 2500, "test 1 failed"
    assert sol.average([1000,2000,3000]) == 2000, "test 2 failed"
    print("✓ average-salary-excluding-the-minimum-and-maximum-salary passed")

if __name__ == "__main__":
    test()
