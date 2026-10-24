from typing import List

class Solution:
    def numRescueBoats(self, people: List[int], limit: int) -> int:
        people.sort()
        lo, hi = 0, len(people) - 1
        boats = 0
        while lo <= hi:
            if people[lo] + people[hi] <= limit:
                lo += 1
            hi -= 1
            boats += 1
        return boats

def test():
    sol = Solution()
    assert sol.numRescueBoats([1, 2], 3) == 1, "test 1 failed"
    assert sol.numRescueBoats([3, 2, 2, 1], 3) == 3, "test 2 failed"
    assert sol.numRescueBoats([3, 5, 3, 4], 5) == 4, "test 3 failed"
    print("✓ boats-to-save-people passed")

if __name__ == "__main__":
    test()
