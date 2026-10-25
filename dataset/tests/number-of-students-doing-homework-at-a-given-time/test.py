class Solution:
    def busyStudent(self, startTime: list[int], endTime: list[int], queryTime: int) -> int:
        return sum(1 for s, e in zip(startTime, endTime) if s <= queryTime <= e)

def test():
    sol = Solution()
    assert sol.busyStudent([1,2,3], [3,2,7], 4) == 1, "test 1 failed"
    assert sol.busyStudent([4], [4], 4) == 1, "test 2 failed"
    print("✓ number-of-students-doing-homework-at-a-given-time passed")

if __name__ == "__main__":
    test()
